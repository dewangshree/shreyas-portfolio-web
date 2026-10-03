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

        stage('Verify Node') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
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

        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Cleaning existing Shreyas Portfolio frontend files..."
                    ssh -i ~/.ssh/shree shree@54.37.159.71 \
                      'rm -rf /var/www/shreyas-portfolio/frontend/*'

                    echo "Deploying new frontend build..."
                    scp -i ~/.ssh/shree -r dist/. \
                      shree@54.37.159.71:/var/www/shreyas-portfolio/frontend/

                    echo "Checking deployed website..."
                    curl --fail --silent --show-error \
                      https://shreyasportfolio.hopto.org/ > /dev/null

                    echo "Frontend deployment successful."
                '''
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Frontend CI/CD + SonarQube completed successfully.'
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}