import { configHarrier } from "../config/configHarrier";

export const getStartScript = () => {
  const START_SCRIPT = `#!/bin/bash
    echo "Starting setup.sh script"

    # Update the package list
    sudo apt-get update -y

    # DISPLAY THE VALUES FOR TESTING - *** DELETE EVENTUALLY ***
    # echo "token: $ {token}"
    echo "url: ${configHarrier.githubUrl}"

    echo "cd /home/"
    cd /home/
    #echo "cd ec2-user"
    #cd ec2-user
    echo "cd ubuntu"
    cd ubuntu

    # Install jq
    sudo apt install -y jq

     # Install build-essentials
    echo "%%%% before build-essentials install %%%%";
    sudo apt install -y build-essential
    echo "%%%% after build-essentials install %%%%";

    # Install GitHub Actions Self-Hosted Runner
    # Create a folder and switch to it.
    echo "mkdir actions-runner"
    mkdir actions-runner
    #echo "cd actions-runner"
    #cd actions-runner

    #cd ..
    sudo chown ubuntu:ubuntu ./actions-runner
    cd actions-runner

    # Download the latest runner package
    echo "DOWNLOAD GITHUB ACTIONS RUNNER"
    curl -o actions-runner-linux-x64-2.320.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.320.0/actions-runner-linux-x64-2.320.0.tar.gz
    # Extract the installer
    echo "*** EXTRACT GITHUB ACTIONS RUNNER ***"
    tar xzf ./actions-runner-linux-x64-2.320.0.tar.gz

    # Need to install this to get .config.sh to work
    echo "*** INSTALL LIBICU ***"
    #sudo yum install libicu -y
    sudo apt update && sudo apt install -y libicu-dev

    # Create the runner and start the configuration experience
    # echo "RUN ./CONFIG.SH TO REGISTER SLF-HOSTED RUNNER"
    # RUNNER_ALLOW_RUNASROOT="1" ./config.sh --url $ {url} --token $ {token} --unattended

    # Install Git
    echo "*** INSTALL GIT ***"
    #sudo dnf install git -y
    sudo apt install -y git

    # Download Mountpoint
    echo "**** DOWNLOAD MOUNTPOINT ***"
    sudo wget https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.deb

    # install Mountpoint
    # sudo yum install -y ./mount-s3.rpm
    echo "**** INSTALL MOUNTPOINT ***"
    sudo apt install -y ./mount-s3.deb

    # mount s3 bucket into user folder (/home/ec2-user/)
    # sudo yum install -y ./mount-s3.rpm
    echo "**** MKDIR S3BUCKET ***"
    mkdir s3bucket
    sudo chown ubuntu:ubuntu ./s3bucket
    echo "**** SUDO MKDIR S3BUCKET ***"
    sudo mkdir s3bucket
    echo "**** SUDO MOUNT-S3 S3BUCKET ***"
    # sudo mount-s3 ${configHarrier.s3Name} s3bucket
    # su - ubuntu -c "mount-s3 ${configHarrier.s3Name} /home/ubuntu/actions-runner/s3bucket --allow-overwrite"
    # sudo cd ./s3bucket
    # sudo mkdir s3bucket/node_modules_cache_key
    # sudo mkdir s3bucket/node_modules_cached_tar
    # sudo mkdir s3bucket/npm_cache
    # sudo cd ..
    # sudo touch starter_file.txt
    # sudo cp starter_file.txt ./s3bucket/node_modules_cache_key/
    # sudo cp starter_file.txt ./s3bucket/node_modules_cached_tar/
    # sudo cp starter_file.txt ./s3bucket/npm_cache/

    echo "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
    echo "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
    # Install Docker
    echo "INSTALL DOCKER"
    #sudo dnf install -y docker
    sudo apt-get install -y docker.io
    echo "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"

    # Give current user some permissions
    echo "Give current user some permissions!!!!"
    echo $USER
    echo "*** CALL - sudo usermod -aG docker $USER ***"
    sudo usermod -aG docker $USER
    sudo usermod -aG docker ubuntu
    echo "*** ALSO TRY - usermod -aG docker $USER ***"
    usermod -aG docker $USER
    usermod -aG docker ubuntu
    echo "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
    echo "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"



    # Start Docker deamon and set to start-up on reboots
    echo "START DOCKER DAEMON AND SET TO START-UP AUTOMATICALLY ON REBOOTS"
    sudo systemctl start docker
    sudo systemctl enable docker
    groups
    getent group docker
    echo "!!!!!!!!  END OF START SCRIPT !!!!!!"`;

  return START_SCRIPT;
};
