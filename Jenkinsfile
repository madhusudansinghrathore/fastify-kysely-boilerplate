pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Lint & Format Check') {
            steps {
                // Assuming lint script exists
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Security Scan (Mock)') {
            steps {
                echo 'Running security scan...'
                echo 'Security scan passed'
            }
        }

        stage('Deploy (Mock)') {
            steps {
                echo 'Deploying application...'
                // Example: docker build & push, or deploy to k8s
                echo 'Deployment successful'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
