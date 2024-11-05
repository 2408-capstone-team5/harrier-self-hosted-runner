export const getStartScript = (url: string) => {
  if (!url) {
    throw new Error("Github Self-Hosted Runner URL Missing!");
  }

  const START_SCRIPT =
    `#!/bin/bash
    echo "Starting setup.sh script"

    # DISPLAY THE VALUES FOR TESTING - *** DELETE EVENTUALLY ***
    # echo "token: $ {token}"
    echo "url: ${url}"


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
    sudo mount-s3 test-bucket-4-gp s3bucket

    # Install Docker
    echo "INSTALL DOCKER"
    sudo dnf install -y docker
    # Give current user some permissions
    echo $USER
    echo "*** CALL - sudo usermod -aG docker $USER ***"
    sudo usermod -aG docker $USER
    # Start Docker deamon and set to start-up on reboots
    echo "START DOCKER DAEMON AND SET TO START-UP AUTOMATICALLY ON REBOOTS"
    sudo systemctl start docker && sudo systemctl enable docker

    # Create a systemd service file to re-start runner on EC2 instance re-boot
    echo "CREATE HARRIER-RUNNER.SERVICE FILE"
    cat <<EOF > /etc/systemd/system/harrier-runner.service
    [Unit]
    Description=Run script at instance startup
    After=network.target

    [Service]
    Environment="RUNNER_ALLOW_RUNASROOT=1"
    ExecStart=/home/ec2-user/actions-runner/run.sh
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target` +
    "\nEOF\n" +
    `# Make the script executable (if not already)
    echo "MAKE THE RUN.SH SCRIPT EXECUTABLE"
    chmod +x /home/ec2-user/actions-runner/run.sh

    # Reload systemd to recognize the new service
    echo "RELOAD SYSTEMD TO RECOGNIZE NEW HARRIER-RUNNER SERVICE"
    systemctl daemon-reload

    # Start hibernation agent
    #systemctl start hibinit-agent

    # Enable the service
    echo "ENABLE HARRIER-RUNNER SERVICE"
    systemctl enable harrier-runner.service
    echo "START HARRIER-RUNNER SERVICE #1"
    systemctl start harrier-runner.service

    echo "*** GETENT GROUP DOCKER ***"
    getent group docker

    # Apply the change immediately without needing to reboot with newgrp
    # Which switches to a new shell, then
    # we use a subshell one-liner to execute some commands in the new shell
    echo "NEWGRP DOCKER <<EOF"
    newgrp docker <<EOF
    echo "SEND POST REQUEST TO REQUESTBIN..."
    # SEND POST REQUEST TO REQUESTBIN FOR TESTING
    curl -X POST -d "status=Runner Starting!" https://eng4r886gr5xw.x.pipedream.net/status/runner/starting

    # Start the service
    echo "START HARRIER-RUNNER SERVICE #2"
    systemctl start harrier-runner.service
    echo "DONE!!!!!!"
    echo "*** GETENT GROUP DOCKER ***"
    getent group docker` +
    "\nEOF\n";

  return START_SCRIPT;
};