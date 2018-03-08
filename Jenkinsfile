node {
    def PROJECT_NAME = "mplatform-ui-login-service"

    // Clean workspace before doing anything
    deleteDir()

    try {
        stage ('Clone') {
            checkout scm
        }

        stage('Build') {
            sh "npm install"
        }

        stage ('Tests') {
            //'UI': {
            //    sh "yarn test"
            //}
        }

        stage('Publish') {
            docker.withRegistry('https://registry.hub.docker.com/v1/repositories', 'docker-personal') {
                def customImage = docker.build("christianvonstaampf/jenkinstest:${env.BUILD_ID}")
                customImage.push()
                customImage.push('latest')
            }
        }


    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}



