pipeline {
    agent any

    environment {
        PATH = "/Applications/Docker.app/Contents/Resources/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${env.PATH}"
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

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                      -t shreyas-portfolio-frontend:${BUILD_NUMBER} \
                      -t shreyas-portfolio-frontend:latest \
                      .
                '''
            }
        }

        stage('Docker Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Sending frontend Docker image to server..."

                    docker save shreyas-portfolio-frontend:${BUILD_NUMBER} | gzip | \
                    ssh -i ~/.ssh/shree shree@54.37.159.71 \
                      'gunzip | sudo docker load'

                    echo "Replacing frontend container on server..."

                    ssh -i ~/.ssh/shree shree@54.37.159.71 "
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

                    echo "Frontend Docker deployment successful."
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend CI/CD + SonarQube + Docker deployment completed successfully.'
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}