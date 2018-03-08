pipeline {
    agent any

    stages {
        stage ('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh "npm install"
            }
        }

        //stage ('Tests') {
        //    steps {
        //        sh "yarn test"
        //    }
        //}

        stage('Publish') {
            steps {
                docker.withRegistry('https://registry.hub.docker.com/v1/repositories', 'docker-personal') {
                    def customImage = docker.build("christianvonstaampf/jenkinstest:${env.BUILD_ID}")
                    customImage.push()
                    customImage.push('latest')
                }
            }
        }
    }
}



