/* 
    Create Public Subnet
    Enable auto-assign public IPv4 address with CIDR blocks 10.0.1.0/24
    Create Internet Gateway and Attach to VPC
    Create Route Table and select our VPC
    Edit Routes => Add Route => 0.0.0.0 traffic to harrier gateway
    Associate public subnet with route table

  */
export const setupVPC = () => {};
