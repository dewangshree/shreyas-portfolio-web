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

        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Deploying frontend with rsync..."

                    rsync -az --delete \
                      -e "ssh -i ~/.ssh/shree" \
                      dist/ \
                      shree@54.37.159.71:/var/www/shreyas-portfolio/frontend/

                    echo "Checking deployed website..."

                    curl --fail --silent --show-error \
                      https://shreyasportfolio.hopto.org/ > /dev/null

                    echo "Frontend deployment successful."
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend CI/CD + SonarQube + Docker completed successfully.'
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}
