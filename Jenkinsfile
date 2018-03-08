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
                script {
                    withDockerRegistry([credentialsId: 'docker-personal', url: "https://registry.hub.docker.com/v1/repositories/"]) {
                        def image = docker.build("christianvonstaampf/jenkinstest:${env.BUILD_ID}")
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
    }
}



