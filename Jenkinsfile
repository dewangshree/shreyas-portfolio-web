pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${env.PATH}"
    }

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci --prefer-offline --no-audit --no-fund
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'

                    withSonarQubeEnv('SonarQube') {
                        sh """
                            "${scannerHome}/bin/sonar-scanner" \
                              -Dsonar.projectKey=dewangshree_shreyas-portfolio-web_4ec5ac87-4823-4fb0-8a9b-addb46b6b1db \
                              -Dsonar.sources=src \
                              -Dsonar.sourceEncoding=UTF-8 \
                              -Dsonar.nodejs.executable=/usr/local/bin/node
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build & Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Syncing frontend source code to server..."

                    rsync -az --delete \
                      --exclude '.git' \
                      --exclude 'node_modules' \
                      --exclude 'dist' \
                      --exclude '.scannerwork' \
                      -e "ssh -i ~/.ssh/shree" \
                      ./ \
                      shree@54.37.159.71:/home/shree/shreyas-portfolio-frontend-build/

                    echo "Building frontend Docker image on server..."

                    ssh -i ~/.ssh/shree shree@54.37.159.71 "
                        set -e

                        cd /home/shree/shreyas-portfolio-frontend-build

                        sudo docker build \
                          -t shreyas-portfolio-frontend:${BUILD_NUMBER} \
                          -t shreyas-portfolio-frontend:latest \
                          .

                        echo 'Replacing frontend container...'

                        sudo docker rm -f shreyas-portfolio-frontend 2>/dev/null || true

                        sudo docker run -d \
                          --name shreyas-portfolio-frontend \
                          --restart unless-stopped \
                          -p 127.0.0.1:8083:80 \
                          shreyas-portfolio-frontend:${BUILD_NUMBER}
                    "

                    echo "Waiting for frontend container..."
                    sleep 3

                    echo "Checking frontend Docker container..."

                    ssh -i ~/.ssh/shree shree@54.37.159.71 \
                      'curl --fail --silent --show-error http://127.0.0.1:8083/ > /dev/null'

                    echo "Checking public website..."

                    curl --fail --silent --show-error \
                      https://shreyasportfolio.hopto.org/ > /dev/null

                    echo "Frontend server-side Docker build and deployment successful."
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend CI/CD + SonarQube + server-side Docker deployment completed successfully.'
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}