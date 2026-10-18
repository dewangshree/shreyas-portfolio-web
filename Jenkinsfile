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

        stage('Verify') {
            steps {
                sh '''
                    npm ci --prefer-offline --no-audit --no-fund
                    npm run build
                '''
            }
        }

        stage('Deploy') {
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

                    echo "Frontend server-side Docker deployment successful."
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    set -e

                    echo "Waiting for frontend container..."
                    sleep 3

                    echo "Checking frontend Docker container..."
                    ssh -i ~/.ssh/shree shree@54.37.159.71 \
                      'curl --fail --silent --show-error http://127.0.0.1:8083/ > /dev/null'

                    echo "Checking public website..."
                    curl --fail --silent --show-error \
                      https://shreyasportfolio.hopto.org/ > /dev/null

                    echo "Frontend health checks successful."
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend CI/CD + server-side Docker deployment completed successfully.'
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}
