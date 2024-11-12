"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartScript = void 0;
const configHarrier_1 = require("../config/configHarrier");
const getStartScript = () => {
    const START_SCRIPT = `#!/bin/bash
    echo "Starting setup.sh script"

    # DISPLAY THE VALUES FOR TESTING - *** DELETE EVENTUALLY ***
    # echo "token: $ {token}"
    echo "url: ${configHarrier_1.configHarrier.githubUrl}"


    echo "cd /home/"
    cd /home/
    echo "cd ec2-user"
    cd ec2-user

    # Install GitHub Actions Self-Hosted Runner
    # Create a folder and switch to it.
    echo "mkdir actions-runner"
    mkdir actions-runner
    echo "cd actions-runner"
    cd actions-runner

    # Download the latest runner package
    echo "DOWNLOAD GITHUB ACTIONS RUNNER"
    curl -o actions-runner-linux-x64-2.320.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.320.0/actions-runner-linux-x64-2.320.0.tar.gz
    # Extract the installer
    echo "EXTRACT GITHUB ACTIONS RUNNER"
    tar xzf ./actions-runner-linux-x64-2.320.0.tar.gz

    # Need to install this to get .config.sh to work
    echo "INSTALL LIBICU"
    sudo yum install libicu -y

    # Create the runner and start the configuration experience
    # echo "RUN ./CONFIG.SH TO REGISTER SLF-HOSTED RUNNER"
    # RUNNER_ALLOW_RUNASROOT="1" ./config.sh --url $ {url} --token $ {token} --unattended

    # Install Git
    echo "INSTALL GIT"
    sudo dnf install git -y

    # Download Mountpoint
    sudo wget https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.rpm

    # install Mountpoint
    sudo yum install -y ./mount-s3.rpm

    # mount s3 bucket into user folder (/home/ec2-user/)
    sudo yum install -y ./mount-s3.rpm
    sudo mkdir s3bucket
    sudo mount-s3 ${configHarrier_1.configHarrier.s3Name} s3bucket
    sudo cd ./s3bucket
    sudo mkdir s3bucket/node_modules_cache_key
    sudo mkdir s3bucket/node_modules_cached_tar
    sudo mkdir s3bucket/npm_cache
    sudo cd ..
    sudo touch starter_file.txt
    sudo cp starter_file.txt ./s3bucket/node_modules_cache_key/
    sudo cp starter_file.txt ./s3bucket/node_modules_cached_tar/
    sudo cp starter_file.txt ./s3bucket/npm_cache/

    # Install Docker
    echo "INSTALL DOCKER"
    sudo dnf install -y docker
    # Give current user some permissions
    echo $USER
    echo "*** CALL - sudo usermod -aG docker $USER ***"
    sudo usermod -aG docker $USER
    # Start Docker deamon and set to start-up on reboots
    echo "START DOCKER DAEMON AND SET TO START-UP AUTOMATICALLY ON REBOOTS"
    sudo systemctl start docker && sudo systemctl enable docker`;
    return START_SCRIPT;
};
exports.getStartScript = getStartScript;
