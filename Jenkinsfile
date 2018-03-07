node {
    def PROJECT_NAME = "mplatform-ui-login-service"

    // Clean workspace before doing anything
    deleteDir()

    propertiesData = [disableConcurrentBuilds()]
    if (isValidDeployBranch()) {
       propertiesData = propertiesData + parameters([
            choice(choices: 'none\nDEV\nQA', description: 'Target server to deploy', name: 'deployServer'),
        ])
    }
    properties(propertiesData)

    try {
        stage ('Clone') {
            checkout scm
        }
        //stage ('preparations') {
        //    try {
        //        deploySettings = getDeploySettings()
        //        echo 'Deploy settings were set'
        //    } catch(err) {
        //        println(err.getMessage());
        //        throw err
        //    }
        //}
        stage('Build') {
            sh "npm install"
        }
        stage('Publish') {
            docker.withRegistry('https://registry.hub.docker.com/v1/repositories', 'docker-personal') {
                def customImage = docker.build("christianvonstaampf/jenkinstest:${env.BUILD_ID}")
                customImage.push()
            }
        }
        stage ('Tests') {
            'UI': {
                sh "yarn test"
            }
        }
        if (deploySettings) {
            stage ('Deploy') {
                if (deploySettings.type && deploySettings.version) {
                    // Deploy specific version to a specifc server (IGR or PRD)
                    // sh "mg2-builder release:finish -Drelease.type=${deploySettings.type} -Drelease.version=${deploySettings.version}"
                    // sh "ssh ${deploySettings.ssh} 'mg2-deployer release -Drelease.version=${deploySettings.version}'"
                    notifyDeployedVersion(deploySettings.version)
                } else {
                    // Deploy to develop branch into IGR server
                    // sh "ssh ${deploySettings.ssh} 'mg2-deployer release'"
                }
            }
        }
    } catch (err) {
        currentBuild.result = 'FAILED'
        notifyFailed()
        throw err
    }
}

def isValidDeployBranch() {
    branchDetails = getBranchDetails()
    if (branchDetails.type == 'hotfix' || branchDetails.type == 'release') {
        return true
    }
    return true
}

def getBranchDetails() {
    def branchDetails = [:]
    branchData = BRANCH_NAME.split('/')
    if (branchData.size() == 2) {
        branchDetails['type'] = branchData[0]
        branchDetails['version'] = branchData[1]
        return branchDetails
    }
    return branchDetails
}

def getDeploySettings() {
    def deploySettings = [:]
    if (BRANCH_NAME == 'develop') {
        deploySettings['ssh'] = "user@domain-igr.com"
    } else if (params.deployServer && params.deployServer != 'none') {
        branchDetails = getBranchDetails()
        deploySettings['type'] = branchDetails.type
        deploySettings['version'] = branchDetails.version
        if (params.deployServer == 'PRD') {
            deploySettings['ssh'] = "user@domain-prd.com"
        } else if (params.deployServer == 'IGR') {
            deploySettings['ssh'] = "user@domain-igr.com"
        }
    }
    return deploySettings
}

def notifyDeployedVersion(String version) {
  emailext (
      subject: "Deployed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: "DEPLOYED VERSION '${version}': Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]': Check console output at '${env.BUILD_URL}' [${env.BUILD_NUMBER}]",
      to: "christian@vonstaa.net"
    )
}

def notifyFailed() {
  emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]': Check console output at '${env.BUILD_URL}' [${env.BUILD_NUMBER}]",
      to: "christian@vonstaa.net"
    )
}
