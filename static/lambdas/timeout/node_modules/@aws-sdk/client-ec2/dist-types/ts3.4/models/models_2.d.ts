import {
  AccessScopePath,
  AccessScopePathRequest,
  ApplianceModeSupportValue,
  AttachmentStatus,
  CurrencyCodeValues,
  DeviceTrustProviderType,
  DnsSupportValue,
  DynamicRoutingValue,
  Ipv4PrefixSpecification,
  Ipv6SupportValue,
  NatGatewayAddress,
  PortRange,
  Protocol,
  ReservedInstancesListing,
  RouteTableAssociationState,
  SecurityGroupReferencingSupportValue,
  Tag,
  TagSpecification,
  TransitGatewayAttachmentResourceType,
  TransitGatewayAttachmentState,
  TransitGatewayPeeringAttachment,
  TransitGatewayVpcAttachment,
  TrustProviderType,
  UnsuccessfulItem,
  UserTrustProviderType,
  VerifiedAccessInstance,
  VerifiedAccessSseSpecificationResponse,
  VerifiedAccessTrustProvider,
  VolumeAttachment,
  VpcAttachment,
  VpcPeeringConnection,
} from "./models_0";
import {
  CarrierGateway,
  ClientVpnEndpointStatus,
  ClientVpnRouteStatus,
  CoipCidr,
  CoipPool,
  ConnectionTrackingSpecificationRequest,
  ConnectivityType,
  GatewayType,
  InstanceIpv6Address,
  Ipv4PrefixSpecificationRequest,
  Ipv6PrefixSpecificationRequest,
  NatGatewayState,
  OperatorRequest,
  OperatorResponse,
  PrivateIpAddressSpecification,
  ProvisionedBandwidth,
  Subnet,
  Tenancy,
  VolumeType,
  Vpc,
} from "./models_1";
export interface NatGateway {
  CreateTime?: Date | undefined;
  DeleteTime?: Date | undefined;
  FailureCode?: string | undefined;
  FailureMessage?: string | undefined;
  NatGatewayAddresses?: NatGatewayAddress[] | undefined;
  NatGatewayId?: string | undefined;
  ProvisionedBandwidth?: ProvisionedBandwidth | undefined;
  State?: NatGatewayState | undefined;
  SubnetId?: string | undefined;
  VpcId?: string | undefined;
  Tags?: Tag[] | undefined;
  ConnectivityType?: ConnectivityType | undefined;
}
export interface CreateNatGatewayResult {
  ClientToken?: string | undefined;
  NatGateway?: NatGateway | undefined;
}
export interface CreateNetworkAclRequest {
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  VpcId: string | undefined;
}
export interface NetworkAclAssociation {
  NetworkAclAssociationId?: string | undefined;
  NetworkAclId?: string | undefined;
  SubnetId?: string | undefined;
}
export interface IcmpTypeCode {
  Code?: number | undefined;
  Type?: number | undefined;
}
export declare const RuleAction: {
  readonly allow: "allow";
  readonly deny: "deny";
};
export type RuleAction = (typeof RuleAction)[keyof typeof RuleAction];
export interface NetworkAclEntry {
  CidrBlock?: string | undefined;
  Egress?: boolean | undefined;
  IcmpTypeCode?: IcmpTypeCode | undefined;
  Ipv6CidrBlock?: string | undefined;
  PortRange?: PortRange | undefined;
  Protocol?: string | undefined;
  RuleAction?: RuleAction | undefined;
  RuleNumber?: number | undefined;
}
export interface NetworkAcl {
  Associations?: NetworkAclAssociation[] | undefined;
  Entries?: NetworkAclEntry[] | undefined;
  IsDefault?: boolean | undefined;
  NetworkAclId?: string | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
  OwnerId?: string | undefined;
}
export interface CreateNetworkAclResult {
  NetworkAcl?: NetworkAcl | undefined;
  ClientToken?: string | undefined;
}
export interface CreateNetworkAclEntryRequest {
  DryRun?: boolean | undefined;
  NetworkAclId: string | undefined;
  RuleNumber: number | undefined;
  Protocol: string | undefined;
  RuleAction: RuleAction | undefined;
  Egress: boolean | undefined;
  CidrBlock?: string | undefined;
  Ipv6CidrBlock?: string | undefined;
  IcmpTypeCode?: IcmpTypeCode | undefined;
  PortRange?: PortRange | undefined;
}
export interface CreateNetworkInsightsAccessScopeRequest {
  MatchPaths?: AccessScopePathRequest[] | undefined;
  ExcludePaths?: AccessScopePathRequest[] | undefined;
  ClientToken?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface NetworkInsightsAccessScope {
  NetworkInsightsAccessScopeId?: string | undefined;
  NetworkInsightsAccessScopeArn?: string | undefined;
  CreatedDate?: Date | undefined;
  UpdatedDate?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface NetworkInsightsAccessScopeContent {
  NetworkInsightsAccessScopeId?: string | undefined;
  MatchPaths?: AccessScopePath[] | undefined;
  ExcludePaths?: AccessScopePath[] | undefined;
}
export interface CreateNetworkInsightsAccessScopeResult {
  NetworkInsightsAccessScope?: NetworkInsightsAccessScope | undefined;
  NetworkInsightsAccessScopeContent?:
    | NetworkInsightsAccessScopeContent
    | undefined;
}
export interface RequestFilterPortRange {
  FromPort?: number | undefined;
  ToPort?: number | undefined;
}
export interface PathRequestFilter {
  SourceAddress?: string | undefined;
  SourcePortRange?: RequestFilterPortRange | undefined;
  DestinationAddress?: string | undefined;
  DestinationPortRange?: RequestFilterPortRange | undefined;
}
export interface CreateNetworkInsightsPathRequest {
  SourceIp?: string | undefined;
  DestinationIp?: string | undefined;
  Source: string | undefined;
  Destination?: string | undefined;
  Protocol: Protocol | undefined;
  DestinationPort?: number | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
  FilterAtSource?: PathRequestFilter | undefined;
  FilterAtDestination?: PathRequestFilter | undefined;
}
export interface FilterPortRange {
  FromPort?: number | undefined;
  ToPort?: number | undefined;
}
export interface PathFilter {
  SourceAddress?: string | undefined;
  SourcePortRange?: FilterPortRange | undefined;
  DestinationAddress?: string | undefined;
  DestinationPortRange?: FilterPortRange | undefined;
}
export interface NetworkInsightsPath {
  NetworkInsightsPathId?: string | undefined;
  NetworkInsightsPathArn?: string | undefined;
  CreatedDate?: Date | undefined;
  Source?: string | undefined;
  Destination?: string | undefined;
  SourceArn?: string | undefined;
  DestinationArn?: string | undefined;
  SourceIp?: string | undefined;
  DestinationIp?: string | undefined;
  Protocol?: Protocol | undefined;
  DestinationPort?: number | undefined;
  Tags?: Tag[] | undefined;
  FilterAtSource?: PathFilter | undefined;
  FilterAtDestination?: PathFilter | undefined;
}
export interface CreateNetworkInsightsPathResult {
  NetworkInsightsPath?: NetworkInsightsPath | undefined;
}
export declare const NetworkInterfaceCreationType: {
  readonly branch: "branch";
  readonly efa: "efa";
  readonly efa_only: "efa-only";
  readonly trunk: "trunk";
};
export type NetworkInterfaceCreationType =
  (typeof NetworkInterfaceCreationType)[keyof typeof NetworkInterfaceCreationType];
export interface CreateNetworkInterfaceRequest {
  Ipv4Prefixes?: Ipv4PrefixSpecificationRequest[] | undefined;
  Ipv4PrefixCount?: number | undefined;
  Ipv6Prefixes?: Ipv6PrefixSpecificationRequest[] | undefined;
  Ipv6PrefixCount?: number | undefined;
  InterfaceType?: NetworkInterfaceCreationType | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  EnablePrimaryIpv6?: boolean | undefined;
  ConnectionTrackingSpecification?:
    | ConnectionTrackingSpecificationRequest
    | undefined;
  Operator?: OperatorRequest | undefined;
  SubnetId: string | undefined;
  Description?: string | undefined;
  PrivateIpAddress?: string | undefined;
  Groups?: string[] | undefined;
  PrivateIpAddresses?: PrivateIpAddressSpecification[] | undefined;
  SecondaryPrivateIpAddressCount?: number | undefined;
  Ipv6Addresses?: InstanceIpv6Address[] | undefined;
  Ipv6AddressCount?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface NetworkInterfaceAssociation {
  AllocationId?: string | undefined;
  AssociationId?: string | undefined;
  IpOwnerId?: string | undefined;
  PublicDnsName?: string | undefined;
  PublicIp?: string | undefined;
  CustomerOwnedIp?: string | undefined;
  CarrierIp?: string | undefined;
}
export interface AttachmentEnaSrdUdpSpecification {
  EnaSrdUdpEnabled?: boolean | undefined;
}
export interface AttachmentEnaSrdSpecification {
  EnaSrdEnabled?: boolean | undefined;
  EnaSrdUdpSpecification?: AttachmentEnaSrdUdpSpecification | undefined;
}
export interface NetworkInterfaceAttachment {
  AttachTime?: Date | undefined;
  AttachmentId?: string | undefined;
  DeleteOnTermination?: boolean | undefined;
  DeviceIndex?: number | undefined;
  NetworkCardIndex?: number | undefined;
  InstanceId?: string | undefined;
  InstanceOwnerId?: string | undefined;
  Status?: AttachmentStatus | undefined;
  EnaSrdSpecification?: AttachmentEnaSrdSpecification | undefined;
}
export interface ConnectionTrackingConfiguration {
  TcpEstablishedTimeout?: number | undefined;
  UdpStreamTimeout?: number | undefined;
  UdpTimeout?: number | undefined;
}
export interface GroupIdentifier {
  GroupId?: string | undefined;
  GroupName?: string | undefined;
}
export declare const NetworkInterfaceType: {
  readonly api_gateway_managed: "api_gateway_managed";
  readonly aws_codestar_connections_managed: "aws_codestar_connections_managed";
  readonly branch: "branch";
  readonly efa: "efa";
  readonly efa_only: "efa-only";
  readonly gateway_load_balancer: "gateway_load_balancer";
  readonly gateway_load_balancer_endpoint: "gateway_load_balancer_endpoint";
  readonly global_accelerator_managed: "global_accelerator_managed";
  readonly interface: "interface";
  readonly iot_rules_managed: "iot_rules_managed";
  readonly lambda: "lambda";
  readonly load_balancer: "load_balancer";
  readonly natGateway: "natGateway";
  readonly network_load_balancer: "network_load_balancer";
  readonly quicksight: "quicksight";
  readonly transit_gateway: "transit_gateway";
  readonly trunk: "trunk";
  readonly vpc_endpoint: "vpc_endpoint";
};
export type NetworkInterfaceType =
  (typeof NetworkInterfaceType)[keyof typeof NetworkInterfaceType];
export interface NetworkInterfaceIpv6Address {
  Ipv6Address?: string | undefined;
  IsPrimaryIpv6?: boolean | undefined;
}
export interface Ipv6PrefixSpecification {
  Ipv6Prefix?: string | undefined;
}
export interface NetworkInterfacePrivateIpAddress {
  Association?: NetworkInterfaceAssociation | undefined;
  Primary?: boolean | undefined;
  PrivateDnsName?: string | undefined;
  PrivateIpAddress?: string | undefined;
}
export declare const NetworkInterfaceStatus: {
  readonly associated: "associated";
  readonly attaching: "attaching";
  readonly available: "available";
  readonly detaching: "detaching";
  readonly in_use: "in-use";
};
export type NetworkInterfaceStatus =
  (typeof NetworkInterfaceStatus)[keyof typeof NetworkInterfaceStatus];
export interface NetworkInterface {
  Association?: NetworkInterfaceAssociation | undefined;
  Attachment?: NetworkInterfaceAttachment | undefined;
  AvailabilityZone?: string | undefined;
  ConnectionTrackingConfiguration?: ConnectionTrackingConfiguration | undefined;
  Description?: string | undefined;
  Groups?: GroupIdentifier[] | undefined;
  InterfaceType?: NetworkInterfaceType | undefined;
  Ipv6Addresses?: NetworkInterfaceIpv6Address[] | undefined;
  MacAddress?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  OutpostArn?: string | undefined;
  OwnerId?: string | undefined;
  PrivateDnsName?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PrivateIpAddresses?: NetworkInterfacePrivateIpAddress[] | undefined;
  Ipv4Prefixes?: Ipv4PrefixSpecification[] | undefined;
  Ipv6Prefixes?: Ipv6PrefixSpecification[] | undefined;
  RequesterId?: string | undefined;
  RequesterManaged?: boolean | undefined;
  SourceDestCheck?: boolean | undefined;
  Status?: NetworkInterfaceStatus | undefined;
  SubnetId?: string | undefined;
  TagSet?: Tag[] | undefined;
  VpcId?: string | undefined;
  DenyAllIgwTraffic?: boolean | undefined;
  Ipv6Native?: boolean | undefined;
  Ipv6Address?: string | undefined;
  Operator?: OperatorResponse | undefined;
}
export interface CreateNetworkInterfaceResult {
  NetworkInterface?: NetworkInterface | undefined;
  ClientToken?: string | undefined;
}
export declare const InterfacePermissionType: {
  readonly EIP_ASSOCIATE: "EIP-ASSOCIATE";
  readonly INSTANCE_ATTACH: "INSTANCE-ATTACH";
};
export type InterfacePermissionType =
  (typeof InterfacePermissionType)[keyof typeof InterfacePermissionType];
export interface CreateNetworkInterfacePermissionRequest {
  NetworkInterfaceId: string | undefined;
  AwsAccountId?: string | undefined;
  AwsService?: string | undefined;
  Permission: InterfacePermissionType | undefined;
  DryRun?: boolean | undefined;
}
export declare const NetworkInterfacePermissionStateCode: {
  readonly granted: "granted";
  readonly pending: "pending";
  readonly revoked: "revoked";
  readonly revoking: "revoking";
};
export type NetworkInterfacePermissionStateCode =
  (typeof NetworkInterfacePermissionStateCode)[keyof typeof NetworkInterfacePermissionStateCode];
export interface NetworkInterfacePermissionState {
  State?: NetworkInterfacePermissionStateCode | undefined;
  StatusMessage?: string | undefined;
}
export interface NetworkInterfacePermission {
  NetworkInterfacePermissionId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  AwsAccountId?: string | undefined;
  AwsService?: string | undefined;
  Permission?: InterfacePermissionType | undefined;
  PermissionState?: NetworkInterfacePermissionState | undefined;
}
export interface CreateNetworkInterfacePermissionResult {
  InterfacePermission?: NetworkInterfacePermission | undefined;
}
export declare const SpreadLevel: {
  readonly host: "host";
  readonly rack: "rack";
};
export type SpreadLevel = (typeof SpreadLevel)[keyof typeof SpreadLevel];
export declare const PlacementStrategy: {
  readonly cluster: "cluster";
  readonly partition: "partition";
  readonly spread: "spread";
};
export type PlacementStrategy =
  (typeof PlacementStrategy)[keyof typeof PlacementStrategy];
export interface CreatePlacementGroupRequest {
  PartitionCount?: number | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  SpreadLevel?: SpreadLevel | undefined;
  DryRun?: boolean | undefined;
  GroupName?: string | undefined;
  Strategy?: PlacementStrategy | undefined;
}
export declare const PlacementGroupState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type PlacementGroupState =
  (typeof PlacementGroupState)[keyof typeof PlacementGroupState];
export interface PlacementGroup {
  GroupName?: string | undefined;
  State?: PlacementGroupState | undefined;
  Strategy?: PlacementStrategy | undefined;
  PartitionCount?: number | undefined;
  GroupId?: string | undefined;
  Tags?: Tag[] | undefined;
  GroupArn?: string | undefined;
  SpreadLevel?: SpreadLevel | undefined;
}
export interface CreatePlacementGroupResult {
  PlacementGroup?: PlacementGroup | undefined;
}
export interface CreatePublicIpv4PoolRequest {
  DryRun?: boolean | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  NetworkBorderGroup?: string | undefined;
}
export interface CreatePublicIpv4PoolResult {
  PoolId?: string | undefined;
}
export interface CreateReplaceRootVolumeTaskRequest {
  InstanceId: string | undefined;
  SnapshotId?: string | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ImageId?: string | undefined;
  DeleteReplacedRootVolume?: boolean | undefined;
}
export declare const ReplaceRootVolumeTaskState: {
  readonly failed: "failed";
  readonly failed_detached: "failed-detached";
  readonly failing: "failing";
  readonly in_progress: "in-progress";
  readonly pending: "pending";
  readonly succeeded: "succeeded";
};
export type ReplaceRootVolumeTaskState =
  (typeof ReplaceRootVolumeTaskState)[keyof typeof ReplaceRootVolumeTaskState];
export interface ReplaceRootVolumeTask {
  ReplaceRootVolumeTaskId?: string | undefined;
  InstanceId?: string | undefined;
  TaskState?: ReplaceRootVolumeTaskState | undefined;
  StartTime?: string | undefined;
  CompleteTime?: string | undefined;
  Tags?: Tag[] | undefined;
  ImageId?: string | undefined;
  SnapshotId?: string | undefined;
  DeleteReplacedRootVolume?: boolean | undefined;
}
export interface CreateReplaceRootVolumeTaskResult {
  ReplaceRootVolumeTask?: ReplaceRootVolumeTask | undefined;
}
export interface PriceScheduleSpecification {
  Term?: number | undefined;
  Price?: number | undefined;
  CurrencyCode?: CurrencyCodeValues | undefined;
}
export interface CreateReservedInstancesListingRequest {
  ReservedInstancesId: string | undefined;
  InstanceCount: number | undefined;
  PriceSchedules: PriceScheduleSpecification[] | undefined;
  ClientToken: string | undefined;
}
export interface CreateReservedInstancesListingResult {
  ReservedInstancesListings?: ReservedInstancesListing[] | undefined;
}
export interface CreateRestoreImageTaskRequest {
  Bucket: string | undefined;
  ObjectKey: string | undefined;
  Name?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateRestoreImageTaskResult {
  ImageId?: string | undefined;
}
export interface CreateRouteRequest {
  DestinationPrefixListId?: string | undefined;
  VpcEndpointId?: string | undefined;
  TransitGatewayId?: string | undefined;
  LocalGatewayId?: string | undefined;
  CarrierGatewayId?: string | undefined;
  CoreNetworkArn?: string | undefined;
  DryRun?: boolean | undefined;
  RouteTableId: string | undefined;
  DestinationCidrBlock?: string | undefined;
  GatewayId?: string | undefined;
  DestinationIpv6CidrBlock?: string | undefined;
  EgressOnlyInternetGatewayId?: string | undefined;
  InstanceId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  VpcPeeringConnectionId?: string | undefined;
  NatGatewayId?: string | undefined;
}
export interface CreateRouteResult {
  Return?: boolean | undefined;
}
export interface CreateRouteTableRequest {
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  VpcId: string | undefined;
}
export interface RouteTableAssociation {
  Main?: boolean | undefined;
  RouteTableAssociationId?: string | undefined;
  RouteTableId?: string | undefined;
  SubnetId?: string | undefined;
  GatewayId?: string | undefined;
  AssociationState?: RouteTableAssociationState | undefined;
}
export interface PropagatingVgw {
  GatewayId?: string | undefined;
}
export declare const RouteOrigin: {
  readonly CreateRoute: "CreateRoute";
  readonly CreateRouteTable: "CreateRouteTable";
  readonly EnableVgwRoutePropagation: "EnableVgwRoutePropagation";
};
export type RouteOrigin = (typeof RouteOrigin)[keyof typeof RouteOrigin];
export declare const RouteState: {
  readonly active: "active";
  readonly blackhole: "blackhole";
};
export type RouteState = (typeof RouteState)[keyof typeof RouteState];
export interface Route {
  DestinationCidrBlock?: string | undefined;
  DestinationIpv6CidrBlock?: string | undefined;
  DestinationPrefixListId?: string | undefined;
  EgressOnlyInternetGatewayId?: string | undefined;
  GatewayId?: string | undefined;
  InstanceId?: string | undefined;
  InstanceOwnerId?: string | undefined;
  NatGatewayId?: string | undefined;
  TransitGatewayId?: string | undefined;
  LocalGatewayId?: string | undefined;
  CarrierGatewayId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  Origin?: RouteOrigin | undefined;
  State?: RouteState | undefined;
  VpcPeeringConnectionId?: string | undefined;
  CoreNetworkArn?: string | undefined;
}
export interface RouteTable {
  Associations?: RouteTableAssociation[] | undefined;
  PropagatingVgws?: PropagatingVgw[] | undefined;
  RouteTableId?: string | undefined;
  Routes?: Route[] | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
  OwnerId?: string | undefined;
}
export interface CreateRouteTableResult {
  RouteTable?: RouteTable | undefined;
  ClientToken?: string | undefined;
}
export interface CreateSecurityGroupRequest {
  Description: string | undefined;
  GroupName: string | undefined;
  VpcId?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateSecurityGroupResult {
  GroupId?: string | undefined;
  Tags?: Tag[] | undefined;
  SecurityGroupArn?: string | undefined;
}
export interface CreateSnapshotRequest {
  Description?: string | undefined;
  OutpostArn?: string | undefined;
  VolumeId: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const SSEType: {
  readonly none: "none";
  readonly sse_ebs: "sse-ebs";
  readonly sse_kms: "sse-kms";
};
export type SSEType = (typeof SSEType)[keyof typeof SSEType];
export declare const SnapshotState: {
  readonly completed: "completed";
  readonly error: "error";
  readonly pending: "pending";
  readonly recoverable: "recoverable";
  readonly recovering: "recovering";
};
export type SnapshotState = (typeof SnapshotState)[keyof typeof SnapshotState];
export declare const StorageTier: {
  readonly archive: "archive";
  readonly standard: "standard";
};
export type StorageTier = (typeof StorageTier)[keyof typeof StorageTier];
export interface Snapshot {
  OwnerAlias?: string | undefined;
  OutpostArn?: string | undefined;
  Tags?: Tag[] | undefined;
  StorageTier?: StorageTier | undefined;
  RestoreExpiryTime?: Date | undefined;
  SseType?: SSEType | undefined;
  SnapshotId?: string | undefined;
  VolumeId?: string | undefined;
  State?: SnapshotState | undefined;
  StateMessage?: string | undefined;
  StartTime?: Date | undefined;
  Progress?: string | undefined;
  OwnerId?: string | undefined;
  Description?: string | undefined;
  VolumeSize?: number | undefined;
  Encrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  DataEncryptionKeyId?: string | undefined;
}
export declare const CopyTagsFromSource: {
  readonly volume: "volume";
};
export type CopyTagsFromSource =
  (typeof CopyTagsFromSource)[keyof typeof CopyTagsFromSource];
export interface InstanceSpecification {
  InstanceId: string | undefined;
  ExcludeBootVolume?: boolean | undefined;
  ExcludeDataVolumeIds?: string[] | undefined;
}
export interface CreateSnapshotsRequest {
  Description?: string | undefined;
  InstanceSpecification: InstanceSpecification | undefined;
  OutpostArn?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  CopyTagsFromSource?: CopyTagsFromSource | undefined;
}
export interface SnapshotInfo {
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  Encrypted?: boolean | undefined;
  VolumeId?: string | undefined;
  State?: SnapshotState | undefined;
  VolumeSize?: number | undefined;
  StartTime?: Date | undefined;
  Progress?: string | undefined;
  OwnerId?: string | undefined;
  SnapshotId?: string | undefined;
  OutpostArn?: string | undefined;
  SseType?: SSEType | undefined;
}
export interface CreateSnapshotsResult {
  Snapshots?: SnapshotInfo[] | undefined;
}
export interface CreateSpotDatafeedSubscriptionRequest {
  DryRun?: boolean | undefined;
  Bucket: string | undefined;
  Prefix?: string | undefined;
}
export interface SpotInstanceStateFault {
  Code?: string | undefined;
  Message?: string | undefined;
}
export declare const DatafeedSubscriptionState: {
  readonly Active: "Active";
  readonly Inactive: "Inactive";
};
export type DatafeedSubscriptionState =
  (typeof DatafeedSubscriptionState)[keyof typeof DatafeedSubscriptionState];
export interface SpotDatafeedSubscription {
  Bucket?: string | undefined;
  Fault?: SpotInstanceStateFault | undefined;
  OwnerId?: string | undefined;
  Prefix?: string | undefined;
  State?: DatafeedSubscriptionState | undefined;
}
export interface CreateSpotDatafeedSubscriptionResult {
  SpotDatafeedSubscription?: SpotDatafeedSubscription | undefined;
}
export interface S3ObjectTag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export interface CreateStoreImageTaskRequest {
  ImageId: string | undefined;
  Bucket: string | undefined;
  S3ObjectTags?: S3ObjectTag[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateStoreImageTaskResult {
  ObjectKey?: string | undefined;
}
export interface CreateSubnetRequest {
  TagSpecifications?: TagSpecification[] | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  CidrBlock?: string | undefined;
  Ipv6CidrBlock?: string | undefined;
  OutpostArn?: string | undefined;
  VpcId: string | undefined;
  Ipv6Native?: boolean | undefined;
  Ipv4IpamPoolId?: string | undefined;
  Ipv4NetmaskLength?: number | undefined;
  Ipv6IpamPoolId?: string | undefined;
  Ipv6NetmaskLength?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateSubnetResult {
  Subnet?: Subnet | undefined;
}
export declare const SubnetCidrReservationType: {
  readonly explicit: "explicit";
  readonly prefix: "prefix";
};
export type SubnetCidrReservationType =
  (typeof SubnetCidrReservationType)[keyof typeof SubnetCidrReservationType];
export interface CreateSubnetCidrReservationRequest {
  SubnetId: string | undefined;
  Cidr: string | undefined;
  ReservationType: SubnetCidrReservationType | undefined;
  Description?: string | undefined;
  DryRun?: boolean | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface SubnetCidrReservation {
  SubnetCidrReservationId?: string | undefined;
  SubnetId?: string | undefined;
  Cidr?: string | undefined;
  ReservationType?: SubnetCidrReservationType | undefined;
  OwnerId?: string | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateSubnetCidrReservationResult {
  SubnetCidrReservation?: SubnetCidrReservation | undefined;
}
export interface CreateTagsRequest {
  DryRun?: boolean | undefined;
  Resources: string[] | undefined;
  Tags: Tag[] | undefined;
}
export interface CreateTrafficMirrorFilterRequest {
  Description?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
}
export interface TrafficMirrorPortRange {
  FromPort?: number | undefined;
  ToPort?: number | undefined;
}
export declare const TrafficMirrorRuleAction: {
  readonly accept: "accept";
  readonly reject: "reject";
};
export type TrafficMirrorRuleAction =
  (typeof TrafficMirrorRuleAction)[keyof typeof TrafficMirrorRuleAction];
export declare const TrafficDirection: {
  readonly egress: "egress";
  readonly ingress: "ingress";
};
export type TrafficDirection =
  (typeof TrafficDirection)[keyof typeof TrafficDirection];
export interface TrafficMirrorFilterRule {
  TrafficMirrorFilterRuleId?: string | undefined;
  TrafficMirrorFilterId?: string | undefined;
  TrafficDirection?: TrafficDirection | undefined;
  RuleNumber?: number | undefined;
  RuleAction?: TrafficMirrorRuleAction | undefined;
  Protocol?: number | undefined;
  DestinationPortRange?: TrafficMirrorPortRange | undefined;
  SourcePortRange?: TrafficMirrorPortRange | undefined;
  DestinationCidrBlock?: string | undefined;
  SourceCidrBlock?: string | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export declare const TrafficMirrorNetworkService: {
  readonly amazon_dns: "amazon-dns";
};
export type TrafficMirrorNetworkService =
  (typeof TrafficMirrorNetworkService)[keyof typeof TrafficMirrorNetworkService];
export interface TrafficMirrorFilter {
  TrafficMirrorFilterId?: string | undefined;
  IngressFilterRules?: TrafficMirrorFilterRule[] | undefined;
  EgressFilterRules?: TrafficMirrorFilterRule[] | undefined;
  NetworkServices?: TrafficMirrorNetworkService[] | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTrafficMirrorFilterResult {
  TrafficMirrorFilter?: TrafficMirrorFilter | undefined;
  ClientToken?: string | undefined;
}
export interface TrafficMirrorPortRangeRequest {
  FromPort?: number | undefined;
  ToPort?: number | undefined;
}
export interface CreateTrafficMirrorFilterRuleRequest {
  TrafficMirrorFilterId: string | undefined;
  TrafficDirection: TrafficDirection | undefined;
  RuleNumber: number | undefined;
  RuleAction: TrafficMirrorRuleAction | undefined;
  DestinationPortRange?: TrafficMirrorPortRangeRequest | undefined;
  SourcePortRange?: TrafficMirrorPortRangeRequest | undefined;
  Protocol?: number | undefined;
  DestinationCidrBlock: string | undefined;
  SourceCidrBlock: string | undefined;
  Description?: string | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface CreateTrafficMirrorFilterRuleResult {
  TrafficMirrorFilterRule?: TrafficMirrorFilterRule | undefined;
  ClientToken?: string | undefined;
}
export interface CreateTrafficMirrorSessionRequest {
  NetworkInterfaceId: string | undefined;
  TrafficMirrorTargetId: string | undefined;
  TrafficMirrorFilterId: string | undefined;
  PacketLength?: number | undefined;
  SessionNumber: number | undefined;
  VirtualNetworkId?: number | undefined;
  Description?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
}
export interface TrafficMirrorSession {
  TrafficMirrorSessionId?: string | undefined;
  TrafficMirrorTargetId?: string | undefined;
  TrafficMirrorFilterId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  OwnerId?: string | undefined;
  PacketLength?: number | undefined;
  SessionNumber?: number | undefined;
  VirtualNetworkId?: number | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTrafficMirrorSessionResult {
  TrafficMirrorSession?: TrafficMirrorSession | undefined;
  ClientToken?: string | undefined;
}
export interface CreateTrafficMirrorTargetRequest {
  NetworkInterfaceId?: string | undefined;
  NetworkLoadBalancerArn?: string | undefined;
  Description?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
  GatewayLoadBalancerEndpointId?: string | undefined;
}
export declare const TrafficMirrorTargetType: {
  readonly gateway_load_balancer_endpoint: "gateway-load-balancer-endpoint";
  readonly network_interface: "network-interface";
  readonly network_load_balancer: "network-load-balancer";
};
export type TrafficMirrorTargetType =
  (typeof TrafficMirrorTargetType)[keyof typeof TrafficMirrorTargetType];
export interface TrafficMirrorTarget {
  TrafficMirrorTargetId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  NetworkLoadBalancerArn?: string | undefined;
  Type?: TrafficMirrorTargetType | undefined;
  Description?: string | undefined;
  OwnerId?: string | undefined;
  Tags?: Tag[] | undefined;
  GatewayLoadBalancerEndpointId?: string | undefined;
}
export interface CreateTrafficMirrorTargetResult {
  TrafficMirrorTarget?: TrafficMirrorTarget | undefined;
  ClientToken?: string | undefined;
}
export declare const AutoAcceptSharedAttachmentsValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type AutoAcceptSharedAttachmentsValue =
  (typeof AutoAcceptSharedAttachmentsValue)[keyof typeof AutoAcceptSharedAttachmentsValue];
export declare const DefaultRouteTableAssociationValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type DefaultRouteTableAssociationValue =
  (typeof DefaultRouteTableAssociationValue)[keyof typeof DefaultRouteTableAssociationValue];
export declare const DefaultRouteTablePropagationValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type DefaultRouteTablePropagationValue =
  (typeof DefaultRouteTablePropagationValue)[keyof typeof DefaultRouteTablePropagationValue];
export declare const MulticastSupportValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type MulticastSupportValue =
  (typeof MulticastSupportValue)[keyof typeof MulticastSupportValue];
export declare const VpnEcmpSupportValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type VpnEcmpSupportValue =
  (typeof VpnEcmpSupportValue)[keyof typeof VpnEcmpSupportValue];
export interface TransitGatewayRequestOptions {
  AmazonSideAsn?: number | undefined;
  AutoAcceptSharedAttachments?: AutoAcceptSharedAttachmentsValue | undefined;
  DefaultRouteTableAssociation?: DefaultRouteTableAssociationValue | undefined;
  DefaultRouteTablePropagation?: DefaultRouteTablePropagationValue | undefined;
  VpnEcmpSupport?: VpnEcmpSupportValue | undefined;
  DnsSupport?: DnsSupportValue | undefined;
  SecurityGroupReferencingSupport?:
    | SecurityGroupReferencingSupportValue
    | undefined;
  MulticastSupport?: MulticastSupportValue | undefined;
  TransitGatewayCidrBlocks?: string[] | undefined;
}
export interface CreateTransitGatewayRequest {
  Description?: string | undefined;
  Options?: TransitGatewayRequestOptions | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayOptions {
  AmazonSideAsn?: number | undefined;
  TransitGatewayCidrBlocks?: string[] | undefined;
  AutoAcceptSharedAttachments?: AutoAcceptSharedAttachmentsValue | undefined;
  DefaultRouteTableAssociation?: DefaultRouteTableAssociationValue | undefined;
  AssociationDefaultRouteTableId?: string | undefined;
  DefaultRouteTablePropagation?: DefaultRouteTablePropagationValue | undefined;
  PropagationDefaultRouteTableId?: string | undefined;
  VpnEcmpSupport?: VpnEcmpSupportValue | undefined;
  DnsSupport?: DnsSupportValue | undefined;
  SecurityGroupReferencingSupport?:
    | SecurityGroupReferencingSupportValue
    | undefined;
  MulticastSupport?: MulticastSupportValue | undefined;
}
export declare const TransitGatewayState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly modifying: "modifying";
  readonly pending: "pending";
};
export type TransitGatewayState =
  (typeof TransitGatewayState)[keyof typeof TransitGatewayState];
export interface TransitGateway {
  TransitGatewayId?: string | undefined;
  TransitGatewayArn?: string | undefined;
  State?: TransitGatewayState | undefined;
  OwnerId?: string | undefined;
  Description?: string | undefined;
  CreationTime?: Date | undefined;
  Options?: TransitGatewayOptions | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayResult {
  TransitGateway?: TransitGateway | undefined;
}
export declare const ProtocolValue: {
  readonly gre: "gre";
};
export type ProtocolValue = (typeof ProtocolValue)[keyof typeof ProtocolValue];
export interface CreateTransitGatewayConnectRequestOptions {
  Protocol: ProtocolValue | undefined;
}
export interface CreateTransitGatewayConnectRequest {
  TransportTransitGatewayAttachmentId: string | undefined;
  Options: CreateTransitGatewayConnectRequestOptions | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayConnectOptions {
  Protocol?: ProtocolValue | undefined;
}
export interface TransitGatewayConnect {
  TransitGatewayAttachmentId?: string | undefined;
  TransportTransitGatewayAttachmentId?: string | undefined;
  TransitGatewayId?: string | undefined;
  State?: TransitGatewayAttachmentState | undefined;
  CreationTime?: Date | undefined;
  Options?: TransitGatewayConnectOptions | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayConnectResult {
  TransitGatewayConnect?: TransitGatewayConnect | undefined;
}
export interface TransitGatewayConnectRequestBgpOptions {
  PeerAsn?: number | undefined;
}
export interface CreateTransitGatewayConnectPeerRequest {
  TransitGatewayAttachmentId: string | undefined;
  TransitGatewayAddress?: string | undefined;
  PeerAddress: string | undefined;
  BgpOptions?: TransitGatewayConnectRequestBgpOptions | undefined;
  InsideCidrBlocks: string[] | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const BgpStatus: {
  readonly down: "down";
  readonly up: "up";
};
export type BgpStatus = (typeof BgpStatus)[keyof typeof BgpStatus];
export interface TransitGatewayAttachmentBgpConfiguration {
  TransitGatewayAsn?: number | undefined;
  PeerAsn?: number | undefined;
  TransitGatewayAddress?: string | undefined;
  PeerAddress?: string | undefined;
  BgpStatus?: BgpStatus | undefined;
}
export interface TransitGatewayConnectPeerConfiguration {
  TransitGatewayAddress?: string | undefined;
  PeerAddress?: string | undefined;
  InsideCidrBlocks?: string[] | undefined;
  Protocol?: ProtocolValue | undefined;
  BgpConfigurations?: TransitGatewayAttachmentBgpConfiguration[] | undefined;
}
export declare const TransitGatewayConnectPeerState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type TransitGatewayConnectPeerState =
  (typeof TransitGatewayConnectPeerState)[keyof typeof TransitGatewayConnectPeerState];
export interface TransitGatewayConnectPeer {
  TransitGatewayAttachmentId?: string | undefined;
  TransitGatewayConnectPeerId?: string | undefined;
  State?: TransitGatewayConnectPeerState | undefined;
  CreationTime?: Date | undefined;
  ConnectPeerConfiguration?: TransitGatewayConnectPeerConfiguration | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayConnectPeerResult {
  TransitGatewayConnectPeer?: TransitGatewayConnectPeer | undefined;
}
export declare const AutoAcceptSharedAssociationsValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type AutoAcceptSharedAssociationsValue =
  (typeof AutoAcceptSharedAssociationsValue)[keyof typeof AutoAcceptSharedAssociationsValue];
export declare const Igmpv2SupportValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type Igmpv2SupportValue =
  (typeof Igmpv2SupportValue)[keyof typeof Igmpv2SupportValue];
export declare const StaticSourcesSupportValue: {
  readonly disable: "disable";
  readonly enable: "enable";
};
export type StaticSourcesSupportValue =
  (typeof StaticSourcesSupportValue)[keyof typeof StaticSourcesSupportValue];
export interface CreateTransitGatewayMulticastDomainRequestOptions {
  Igmpv2Support?: Igmpv2SupportValue | undefined;
  StaticSourcesSupport?: StaticSourcesSupportValue | undefined;
  AutoAcceptSharedAssociations?: AutoAcceptSharedAssociationsValue | undefined;
}
export interface CreateTransitGatewayMulticastDomainRequest {
  TransitGatewayId: string | undefined;
  Options?: CreateTransitGatewayMulticastDomainRequestOptions | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayMulticastDomainOptions {
  Igmpv2Support?: Igmpv2SupportValue | undefined;
  StaticSourcesSupport?: StaticSourcesSupportValue | undefined;
  AutoAcceptSharedAssociations?: AutoAcceptSharedAssociationsValue | undefined;
}
export declare const TransitGatewayMulticastDomainState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type TransitGatewayMulticastDomainState =
  (typeof TransitGatewayMulticastDomainState)[keyof typeof TransitGatewayMulticastDomainState];
export interface TransitGatewayMulticastDomain {
  TransitGatewayMulticastDomainId?: string | undefined;
  TransitGatewayId?: string | undefined;
  TransitGatewayMulticastDomainArn?: string | undefined;
  OwnerId?: string | undefined;
  Options?: TransitGatewayMulticastDomainOptions | undefined;
  State?: TransitGatewayMulticastDomainState | undefined;
  CreationTime?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayMulticastDomainResult {
  TransitGatewayMulticastDomain?: TransitGatewayMulticastDomain | undefined;
}
export interface CreateTransitGatewayPeeringAttachmentRequestOptions {
  DynamicRouting?: DynamicRoutingValue | undefined;
}
export interface CreateTransitGatewayPeeringAttachmentRequest {
  TransitGatewayId: string | undefined;
  PeerTransitGatewayId: string | undefined;
  PeerAccountId: string | undefined;
  PeerRegion: string | undefined;
  Options?: CreateTransitGatewayPeeringAttachmentRequestOptions | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateTransitGatewayPeeringAttachmentResult {
  TransitGatewayPeeringAttachment?: TransitGatewayPeeringAttachment | undefined;
}
export interface CreateTransitGatewayPolicyTableRequest {
  TransitGatewayId: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const TransitGatewayPolicyTableState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type TransitGatewayPolicyTableState =
  (typeof TransitGatewayPolicyTableState)[keyof typeof TransitGatewayPolicyTableState];
export interface TransitGatewayPolicyTable {
  TransitGatewayPolicyTableId?: string | undefined;
  TransitGatewayId?: string | undefined;
  State?: TransitGatewayPolicyTableState | undefined;
  CreationTime?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayPolicyTableResult {
  TransitGatewayPolicyTable?: TransitGatewayPolicyTable | undefined;
}
export interface CreateTransitGatewayPrefixListReferenceRequest {
  TransitGatewayRouteTableId: string | undefined;
  PrefixListId: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  Blackhole?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export declare const TransitGatewayPrefixListReferenceState: {
  readonly available: "available";
  readonly deleting: "deleting";
  readonly modifying: "modifying";
  readonly pending: "pending";
};
export type TransitGatewayPrefixListReferenceState =
  (typeof TransitGatewayPrefixListReferenceState)[keyof typeof TransitGatewayPrefixListReferenceState];
export interface TransitGatewayPrefixListAttachment {
  TransitGatewayAttachmentId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  ResourceId?: string | undefined;
}
export interface TransitGatewayPrefixListReference {
  TransitGatewayRouteTableId?: string | undefined;
  PrefixListId?: string | undefined;
  PrefixListOwnerId?: string | undefined;
  State?: TransitGatewayPrefixListReferenceState | undefined;
  Blackhole?: boolean | undefined;
  TransitGatewayAttachment?: TransitGatewayPrefixListAttachment | undefined;
}
export interface CreateTransitGatewayPrefixListReferenceResult {
  TransitGatewayPrefixListReference?:
    | TransitGatewayPrefixListReference
    | undefined;
}
export interface CreateTransitGatewayRouteRequest {
  DestinationCidrBlock: string | undefined;
  TransitGatewayRouteTableId: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  Blackhole?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export declare const TransitGatewayRouteState: {
  readonly active: "active";
  readonly blackhole: "blackhole";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type TransitGatewayRouteState =
  (typeof TransitGatewayRouteState)[keyof typeof TransitGatewayRouteState];
export interface TransitGatewayRouteAttachment {
  ResourceId?: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
}
export declare const TransitGatewayRouteType: {
  readonly propagated: "propagated";
  readonly static: "static";
};
export type TransitGatewayRouteType =
  (typeof TransitGatewayRouteType)[keyof typeof TransitGatewayRouteType];
export interface TransitGatewayRoute {
  DestinationCidrBlock?: string | undefined;
  PrefixListId?: string | undefined;
  TransitGatewayRouteTableAnnouncementId?: string | undefined;
  TransitGatewayAttachments?: TransitGatewayRouteAttachment[] | undefined;
  Type?: TransitGatewayRouteType | undefined;
  State?: TransitGatewayRouteState | undefined;
}
export interface CreateTransitGatewayRouteResult {
  Route?: TransitGatewayRoute | undefined;
}
export interface CreateTransitGatewayRouteTableRequest {
  TransitGatewayId: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const TransitGatewayRouteTableState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type TransitGatewayRouteTableState =
  (typeof TransitGatewayRouteTableState)[keyof typeof TransitGatewayRouteTableState];
export interface TransitGatewayRouteTable {
  TransitGatewayRouteTableId?: string | undefined;
  TransitGatewayId?: string | undefined;
  State?: TransitGatewayRouteTableState | undefined;
  DefaultAssociationRouteTable?: boolean | undefined;
  DefaultPropagationRouteTable?: boolean | undefined;
  CreationTime?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayRouteTableResult {
  TransitGatewayRouteTable?: TransitGatewayRouteTable | undefined;
}
export interface CreateTransitGatewayRouteTableAnnouncementRequest {
  TransitGatewayRouteTableId: string | undefined;
  PeeringAttachmentId: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const TransitGatewayRouteTableAnnouncementDirection: {
  readonly incoming: "incoming";
  readonly outgoing: "outgoing";
};
export type TransitGatewayRouteTableAnnouncementDirection =
  (typeof TransitGatewayRouteTableAnnouncementDirection)[keyof typeof TransitGatewayRouteTableAnnouncementDirection];
export declare const TransitGatewayRouteTableAnnouncementState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly failed: "failed";
  readonly failing: "failing";
  readonly pending: "pending";
};
export type TransitGatewayRouteTableAnnouncementState =
  (typeof TransitGatewayRouteTableAnnouncementState)[keyof typeof TransitGatewayRouteTableAnnouncementState];
export interface TransitGatewayRouteTableAnnouncement {
  TransitGatewayRouteTableAnnouncementId?: string | undefined;
  TransitGatewayId?: string | undefined;
  CoreNetworkId?: string | undefined;
  PeerTransitGatewayId?: string | undefined;
  PeerCoreNetworkId?: string | undefined;
  PeeringAttachmentId?: string | undefined;
  AnnouncementDirection?:
    | TransitGatewayRouteTableAnnouncementDirection
    | undefined;
  TransitGatewayRouteTableId?: string | undefined;
  State?: TransitGatewayRouteTableAnnouncementState | undefined;
  CreationTime?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateTransitGatewayRouteTableAnnouncementResult {
  TransitGatewayRouteTableAnnouncement?:
    | TransitGatewayRouteTableAnnouncement
    | undefined;
}
export interface CreateTransitGatewayVpcAttachmentRequestOptions {
  DnsSupport?: DnsSupportValue | undefined;
  SecurityGroupReferencingSupport?:
    | SecurityGroupReferencingSupportValue
    | undefined;
  Ipv6Support?: Ipv6SupportValue | undefined;
  ApplianceModeSupport?: ApplianceModeSupportValue | undefined;
}
export interface CreateTransitGatewayVpcAttachmentRequest {
  TransitGatewayId: string | undefined;
  VpcId: string | undefined;
  SubnetIds: string[] | undefined;
  Options?: CreateTransitGatewayVpcAttachmentRequestOptions | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateTransitGatewayVpcAttachmentResult {
  TransitGatewayVpcAttachment?: TransitGatewayVpcAttachment | undefined;
}
export declare const VerifiedAccessEndpointAttachmentType: {
  readonly vpc: "vpc";
};
export type VerifiedAccessEndpointAttachmentType =
  (typeof VerifiedAccessEndpointAttachmentType)[keyof typeof VerifiedAccessEndpointAttachmentType];
export declare const VerifiedAccessEndpointType: {
  readonly load_balancer: "load-balancer";
  readonly network_interface: "network-interface";
};
export type VerifiedAccessEndpointType =
  (typeof VerifiedAccessEndpointType)[keyof typeof VerifiedAccessEndpointType];
export declare const VerifiedAccessEndpointProtocol: {
  readonly http: "http";
  readonly https: "https";
};
export type VerifiedAccessEndpointProtocol =
  (typeof VerifiedAccessEndpointProtocol)[keyof typeof VerifiedAccessEndpointProtocol];
export interface CreateVerifiedAccessEndpointLoadBalancerOptions {
  Protocol?: VerifiedAccessEndpointProtocol | undefined;
  Port?: number | undefined;
  LoadBalancerArn?: string | undefined;
  SubnetIds?: string[] | undefined;
}
export interface CreateVerifiedAccessEndpointEniOptions {
  NetworkInterfaceId?: string | undefined;
  Protocol?: VerifiedAccessEndpointProtocol | undefined;
  Port?: number | undefined;
}
export interface VerifiedAccessSseSpecificationRequest {
  CustomerManagedKeyEnabled?: boolean | undefined;
  KmsKeyArn?: string | undefined;
}
export interface CreateVerifiedAccessEndpointRequest {
  VerifiedAccessGroupId: string | undefined;
  EndpointType: VerifiedAccessEndpointType | undefined;
  AttachmentType: VerifiedAccessEndpointAttachmentType | undefined;
  DomainCertificateArn: string | undefined;
  ApplicationDomain: string | undefined;
  EndpointDomainPrefix: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  LoadBalancerOptions?:
    | CreateVerifiedAccessEndpointLoadBalancerOptions
    | undefined;
  NetworkInterfaceOptions?: CreateVerifiedAccessEndpointEniOptions | undefined;
  Description?: string | undefined;
  PolicyDocument?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  SseSpecification?: VerifiedAccessSseSpecificationRequest | undefined;
}
export interface VerifiedAccessEndpointLoadBalancerOptions {
  Protocol?: VerifiedAccessEndpointProtocol | undefined;
  Port?: number | undefined;
  LoadBalancerArn?: string | undefined;
  SubnetIds?: string[] | undefined;
}
export interface VerifiedAccessEndpointEniOptions {
  NetworkInterfaceId?: string | undefined;
  Protocol?: VerifiedAccessEndpointProtocol | undefined;
  Port?: number | undefined;
}
export declare const VerifiedAccessEndpointStatusCode: {
  readonly active: "active";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
  readonly updating: "updating";
};
export type VerifiedAccessEndpointStatusCode =
  (typeof VerifiedAccessEndpointStatusCode)[keyof typeof VerifiedAccessEndpointStatusCode];
export interface VerifiedAccessEndpointStatus {
  Code?: VerifiedAccessEndpointStatusCode | undefined;
  Message?: string | undefined;
}
export interface VerifiedAccessEndpoint {
  VerifiedAccessInstanceId?: string | undefined;
  VerifiedAccessGroupId?: string | undefined;
  VerifiedAccessEndpointId?: string | undefined;
  ApplicationDomain?: string | undefined;
  EndpointType?: VerifiedAccessEndpointType | undefined;
  AttachmentType?: VerifiedAccessEndpointAttachmentType | undefined;
  DomainCertificateArn?: string | undefined;
  EndpointDomain?: string | undefined;
  DeviceValidationDomain?: string | undefined;
  SecurityGroupIds?: string[] | undefined;
  LoadBalancerOptions?: VerifiedAccessEndpointLoadBalancerOptions | undefined;
  NetworkInterfaceOptions?: VerifiedAccessEndpointEniOptions | undefined;
  Status?: VerifiedAccessEndpointStatus | undefined;
  Description?: string | undefined;
  CreationTime?: string | undefined;
  LastUpdatedTime?: string | undefined;
  DeletionTime?: string | undefined;
  Tags?: Tag[] | undefined;
  SseSpecification?: VerifiedAccessSseSpecificationResponse | undefined;
}
export interface CreateVerifiedAccessEndpointResult {
  VerifiedAccessEndpoint?: VerifiedAccessEndpoint | undefined;
}
export interface CreateVerifiedAccessGroupRequest {
  VerifiedAccessInstanceId: string | undefined;
  Description?: string | undefined;
  PolicyDocument?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  SseSpecification?: VerifiedAccessSseSpecificationRequest | undefined;
}
export interface VerifiedAccessGroup {
  VerifiedAccessGroupId?: string | undefined;
  VerifiedAccessInstanceId?: string | undefined;
  Description?: string | undefined;
  Owner?: string | undefined;
  VerifiedAccessGroupArn?: string | undefined;
  CreationTime?: string | undefined;
  LastUpdatedTime?: string | undefined;
  DeletionTime?: string | undefined;
  Tags?: Tag[] | undefined;
  SseSpecification?: VerifiedAccessSseSpecificationResponse | undefined;
}
export interface CreateVerifiedAccessGroupResult {
  VerifiedAccessGroup?: VerifiedAccessGroup | undefined;
}
export interface CreateVerifiedAccessInstanceRequest {
  Description?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  FIPSEnabled?: boolean | undefined;
}
export interface CreateVerifiedAccessInstanceResult {
  VerifiedAccessInstance?: VerifiedAccessInstance | undefined;
}
export interface CreateVerifiedAccessTrustProviderDeviceOptions {
  TenantId?: string | undefined;
  PublicSigningKeyUrl?: string | undefined;
}
export interface CreateVerifiedAccessTrustProviderOidcOptions {
  Issuer?: string | undefined;
  AuthorizationEndpoint?: string | undefined;
  TokenEndpoint?: string | undefined;
  UserInfoEndpoint?: string | undefined;
  ClientId?: string | undefined;
  ClientSecret?: string | undefined;
  Scope?: string | undefined;
}
export interface CreateVerifiedAccessTrustProviderRequest {
  TrustProviderType: TrustProviderType | undefined;
  UserTrustProviderType?: UserTrustProviderType | undefined;
  DeviceTrustProviderType?: DeviceTrustProviderType | undefined;
  OidcOptions?: CreateVerifiedAccessTrustProviderOidcOptions | undefined;
  DeviceOptions?: CreateVerifiedAccessTrustProviderDeviceOptions | undefined;
  PolicyReferenceName: string | undefined;
  Description?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
  SseSpecification?: VerifiedAccessSseSpecificationRequest | undefined;
}
export interface CreateVerifiedAccessTrustProviderResult {
  VerifiedAccessTrustProvider?: VerifiedAccessTrustProvider | undefined;
}
export interface CreateVolumeRequest {
  AvailabilityZone: string | undefined;
  Encrypted?: boolean | undefined;
  Iops?: number | undefined;
  KmsKeyId?: string | undefined;
  OutpostArn?: string | undefined;
  Size?: number | undefined;
  SnapshotId?: string | undefined;
  VolumeType?: VolumeType | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  MultiAttachEnabled?: boolean | undefined;
  Throughput?: number | undefined;
  ClientToken?: string | undefined;
  Operator?: OperatorRequest | undefined;
  DryRun?: boolean | undefined;
}
export declare const VolumeState: {
  readonly available: "available";
  readonly creating: "creating";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly error: "error";
  readonly in_use: "in-use";
};
export type VolumeState = (typeof VolumeState)[keyof typeof VolumeState];
export interface Volume {
  OutpostArn?: string | undefined;
  Iops?: number | undefined;
  Tags?: Tag[] | undefined;
  VolumeType?: VolumeType | undefined;
  FastRestored?: boolean | undefined;
  MultiAttachEnabled?: boolean | undefined;
  Throughput?: number | undefined;
  SseType?: SSEType | undefined;
  Operator?: OperatorResponse | undefined;
  VolumeId?: string | undefined;
  Size?: number | undefined;
  SnapshotId?: string | undefined;
  AvailabilityZone?: string | undefined;
  State?: VolumeState | undefined;
  CreateTime?: Date | undefined;
  Attachments?: VolumeAttachment[] | undefined;
  Encrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
}
export interface CreateVpcRequest {
  CidrBlock?: string | undefined;
  Ipv6Pool?: string | undefined;
  Ipv6CidrBlock?: string | undefined;
  Ipv4IpamPoolId?: string | undefined;
  Ipv4NetmaskLength?: number | undefined;
  Ipv6IpamPoolId?: string | undefined;
  Ipv6NetmaskLength?: number | undefined;
  Ipv6CidrBlockNetworkBorderGroup?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  InstanceTenancy?: Tenancy | undefined;
  AmazonProvidedIpv6CidrBlock?: boolean | undefined;
}
export interface CreateVpcResult {
  Vpc?: Vpc | undefined;
}
export declare const InternetGatewayExclusionMode: {
  readonly allow_bidirectional: "allow-bidirectional";
  readonly allow_egress: "allow-egress";
};
export type InternetGatewayExclusionMode =
  (typeof InternetGatewayExclusionMode)[keyof typeof InternetGatewayExclusionMode];
export interface CreateVpcBlockPublicAccessExclusionRequest {
  DryRun?: boolean | undefined;
  SubnetId?: string | undefined;
  VpcId?: string | undefined;
  InternetGatewayExclusionMode: InternetGatewayExclusionMode | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export declare const VpcBlockPublicAccessExclusionState: {
  readonly create_complete: "create-complete";
  readonly create_failed: "create-failed";
  readonly create_in_progress: "create-in-progress";
  readonly delete_complete: "delete-complete";
  readonly delete_in_progress: "delete-in-progress";
  readonly disable_complete: "disable-complete";
  readonly disable_in_progress: "disable-in-progress";
  readonly update_complete: "update-complete";
  readonly update_failed: "update-failed";
  readonly update_in_progress: "update-in-progress";
};
export type VpcBlockPublicAccessExclusionState =
  (typeof VpcBlockPublicAccessExclusionState)[keyof typeof VpcBlockPublicAccessExclusionState];
export interface VpcBlockPublicAccessExclusion {
  ExclusionId?: string | undefined;
  InternetGatewayExclusionMode?: InternetGatewayExclusionMode | undefined;
  ResourceArn?: string | undefined;
  State?: VpcBlockPublicAccessExclusionState | undefined;
  Reason?: string | undefined;
  CreationTimestamp?: Date | undefined;
  LastUpdateTimestamp?: Date | undefined;
  DeletionTimestamp?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateVpcBlockPublicAccessExclusionResult {
  VpcBlockPublicAccessExclusion?: VpcBlockPublicAccessExclusion | undefined;
}
export declare const DnsRecordIpType: {
  readonly dualstack: "dualstack";
  readonly ipv4: "ipv4";
  readonly ipv6: "ipv6";
  readonly service_defined: "service-defined";
};
export type DnsRecordIpType =
  (typeof DnsRecordIpType)[keyof typeof DnsRecordIpType];
export interface DnsOptionsSpecification {
  DnsRecordIpType?: DnsRecordIpType | undefined;
  PrivateDnsOnlyForInboundResolverEndpoint?: boolean | undefined;
}
export declare const IpAddressType: {
  readonly dualstack: "dualstack";
  readonly ipv4: "ipv4";
  readonly ipv6: "ipv6";
};
export type IpAddressType = (typeof IpAddressType)[keyof typeof IpAddressType];
export interface SubnetConfiguration {
  SubnetId?: string | undefined;
  Ipv4?: string | undefined;
  Ipv6?: string | undefined;
}
export declare const VpcEndpointType: {
  readonly Gateway: "Gateway";
  readonly GatewayLoadBalancer: "GatewayLoadBalancer";
  readonly Interface: "Interface";
};
export type VpcEndpointType =
  (typeof VpcEndpointType)[keyof typeof VpcEndpointType];
export interface CreateVpcEndpointRequest {
  DryRun?: boolean | undefined;
  VpcEndpointType?: VpcEndpointType | undefined;
  VpcId: string | undefined;
  ServiceName: string | undefined;
  PolicyDocument?: string | undefined;
  RouteTableIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  IpAddressType?: IpAddressType | undefined;
  DnsOptions?: DnsOptionsSpecification | undefined;
  ClientToken?: string | undefined;
  PrivateDnsEnabled?: boolean | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  SubnetConfigurations?: SubnetConfiguration[] | undefined;
}
export interface DnsEntry {
  DnsName?: string | undefined;
  HostedZoneId?: string | undefined;
}
export interface DnsOptions {
  DnsRecordIpType?: DnsRecordIpType | undefined;
  PrivateDnsOnlyForInboundResolverEndpoint?: boolean | undefined;
}
export interface SecurityGroupIdentifier {
  GroupId?: string | undefined;
  GroupName?: string | undefined;
}
export interface LastError {
  Message?: string | undefined;
  Code?: string | undefined;
}
export declare const State: {
  readonly Available: "Available";
  readonly Deleted: "Deleted";
  readonly Deleting: "Deleting";
  readonly Expired: "Expired";
  readonly Failed: "Failed";
  readonly Pending: "Pending";
  readonly PendingAcceptance: "PendingAcceptance";
  readonly Rejected: "Rejected";
};
export type State = (typeof State)[keyof typeof State];
export interface VpcEndpoint {
  VpcEndpointId?: string | undefined;
  VpcEndpointType?: VpcEndpointType | undefined;
  VpcId?: string | undefined;
  ServiceName?: string | undefined;
  State?: State | undefined;
  PolicyDocument?: string | undefined;
  RouteTableIds?: string[] | undefined;
  SubnetIds?: string[] | undefined;
  Groups?: SecurityGroupIdentifier[] | undefined;
  IpAddressType?: IpAddressType | undefined;
  DnsOptions?: DnsOptions | undefined;
  PrivateDnsEnabled?: boolean | undefined;
  RequesterManaged?: boolean | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  DnsEntries?: DnsEntry[] | undefined;
  CreationTimestamp?: Date | undefined;
  Tags?: Tag[] | undefined;
  OwnerId?: string | undefined;
  LastError?: LastError | undefined;
}
export interface CreateVpcEndpointResult {
  VpcEndpoint?: VpcEndpoint | undefined;
  ClientToken?: string | undefined;
}
export interface CreateVpcEndpointConnectionNotificationRequest {
  DryRun?: boolean | undefined;
  ServiceId?: string | undefined;
  VpcEndpointId?: string | undefined;
  ConnectionNotificationArn: string | undefined;
  ConnectionEvents: string[] | undefined;
  ClientToken?: string | undefined;
}
export declare const ConnectionNotificationState: {
  readonly Disabled: "Disabled";
  readonly Enabled: "Enabled";
};
export type ConnectionNotificationState =
  (typeof ConnectionNotificationState)[keyof typeof ConnectionNotificationState];
export declare const ConnectionNotificationType: {
  readonly Topic: "Topic";
};
export type ConnectionNotificationType =
  (typeof ConnectionNotificationType)[keyof typeof ConnectionNotificationType];
export interface ConnectionNotification {
  ConnectionNotificationId?: string | undefined;
  ServiceId?: string | undefined;
  VpcEndpointId?: string | undefined;
  ConnectionNotificationType?: ConnectionNotificationType | undefined;
  ConnectionNotificationArn?: string | undefined;
  ConnectionEvents?: string[] | undefined;
  ConnectionNotificationState?: ConnectionNotificationState | undefined;
}
export interface CreateVpcEndpointConnectionNotificationResult {
  ConnectionNotification?: ConnectionNotification | undefined;
  ClientToken?: string | undefined;
}
export interface CreateVpcEndpointServiceConfigurationRequest {
  DryRun?: boolean | undefined;
  AcceptanceRequired?: boolean | undefined;
  PrivateDnsName?: string | undefined;
  NetworkLoadBalancerArns?: string[] | undefined;
  GatewayLoadBalancerArns?: string[] | undefined;
  SupportedIpAddressTypes?: string[] | undefined;
  ClientToken?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export declare const PayerResponsibility: {
  readonly ServiceOwner: "ServiceOwner";
};
export type PayerResponsibility =
  (typeof PayerResponsibility)[keyof typeof PayerResponsibility];
export declare const DnsNameState: {
  readonly Failed: "failed";
  readonly PendingVerification: "pendingVerification";
  readonly Verified: "verified";
};
export type DnsNameState = (typeof DnsNameState)[keyof typeof DnsNameState];
export interface PrivateDnsNameConfiguration {
  State?: DnsNameState | undefined;
  Type?: string | undefined;
  Value?: string | undefined;
  Name?: string | undefined;
}
export declare const ServiceState: {
  readonly Available: "Available";
  readonly Deleted: "Deleted";
  readonly Deleting: "Deleting";
  readonly Failed: "Failed";
  readonly Pending: "Pending";
};
export type ServiceState = (typeof ServiceState)[keyof typeof ServiceState];
export declare const ServiceType: {
  readonly Gateway: "Gateway";
  readonly GatewayLoadBalancer: "GatewayLoadBalancer";
  readonly Interface: "Interface";
};
export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType];
export interface ServiceTypeDetail {
  ServiceType?: ServiceType | undefined;
}
export declare const ServiceConnectivityType: {
  readonly ipv4: "ipv4";
  readonly ipv6: "ipv6";
};
export type ServiceConnectivityType =
  (typeof ServiceConnectivityType)[keyof typeof ServiceConnectivityType];
export interface ServiceConfiguration {
  ServiceType?: ServiceTypeDetail[] | undefined;
  ServiceId?: string | undefined;
  ServiceName?: string | undefined;
  ServiceState?: ServiceState | undefined;
  AvailabilityZones?: string[] | undefined;
  AcceptanceRequired?: boolean | undefined;
  ManagesVpcEndpoints?: boolean | undefined;
  NetworkLoadBalancerArns?: string[] | undefined;
  GatewayLoadBalancerArns?: string[] | undefined;
  SupportedIpAddressTypes?: ServiceConnectivityType[] | undefined;
  BaseEndpointDnsNames?: string[] | undefined;
  PrivateDnsName?: string | undefined;
  PrivateDnsNameConfiguration?: PrivateDnsNameConfiguration | undefined;
  PayerResponsibility?: PayerResponsibility | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateVpcEndpointServiceConfigurationResult {
  ServiceConfiguration?: ServiceConfiguration | undefined;
  ClientToken?: string | undefined;
}
export interface CreateVpcPeeringConnectionRequest {
  PeerRegion?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  VpcId: string | undefined;
  PeerVpcId?: string | undefined;
  PeerOwnerId?: string | undefined;
}
export interface CreateVpcPeeringConnectionResult {
  VpcPeeringConnection?: VpcPeeringConnection | undefined;
}
export declare const TunnelInsideIpVersion: {
  readonly ipv4: "ipv4";
  readonly ipv6: "ipv6";
};
export type TunnelInsideIpVersion =
  (typeof TunnelInsideIpVersion)[keyof typeof TunnelInsideIpVersion];
export interface IKEVersionsRequestListValue {
  Value?: string | undefined;
}
export interface CloudWatchLogOptionsSpecification {
  LogEnabled?: boolean | undefined;
  LogGroupArn?: string | undefined;
  LogOutputFormat?: string | undefined;
}
export interface VpnTunnelLogOptionsSpecification {
  CloudWatchLogOptions?: CloudWatchLogOptionsSpecification | undefined;
}
export interface Phase1DHGroupNumbersRequestListValue {
  Value?: number | undefined;
}
export interface Phase1EncryptionAlgorithmsRequestListValue {
  Value?: string | undefined;
}
export interface Phase1IntegrityAlgorithmsRequestListValue {
  Value?: string | undefined;
}
export interface Phase2DHGroupNumbersRequestListValue {
  Value?: number | undefined;
}
export interface Phase2EncryptionAlgorithmsRequestListValue {
  Value?: string | undefined;
}
export interface Phase2IntegrityAlgorithmsRequestListValue {
  Value?: string | undefined;
}
export interface VpnTunnelOptionsSpecification {
  TunnelInsideCidr?: string | undefined;
  TunnelInsideIpv6Cidr?: string | undefined;
  PreSharedKey?: string | undefined;
  Phase1LifetimeSeconds?: number | undefined;
  Phase2LifetimeSeconds?: number | undefined;
  RekeyMarginTimeSeconds?: number | undefined;
  RekeyFuzzPercentage?: number | undefined;
  ReplayWindowSize?: number | undefined;
  DPDTimeoutSeconds?: number | undefined;
  DPDTimeoutAction?: string | undefined;
  Phase1EncryptionAlgorithms?:
    | Phase1EncryptionAlgorithmsRequestListValue[]
    | undefined;
  Phase2EncryptionAlgorithms?:
    | Phase2EncryptionAlgorithmsRequestListValue[]
    | undefined;
  Phase1IntegrityAlgorithms?:
    | Phase1IntegrityAlgorithmsRequestListValue[]
    | undefined;
  Phase2IntegrityAlgorithms?:
    | Phase2IntegrityAlgorithmsRequestListValue[]
    | undefined;
  Phase1DHGroupNumbers?: Phase1DHGroupNumbersRequestListValue[] | undefined;
  Phase2DHGroupNumbers?: Phase2DHGroupNumbersRequestListValue[] | undefined;
  IKEVersions?: IKEVersionsRequestListValue[] | undefined;
  StartupAction?: string | undefined;
  LogOptions?: VpnTunnelLogOptionsSpecification | undefined;
  EnableTunnelLifecycleControl?: boolean | undefined;
}
export interface VpnConnectionOptionsSpecification {
  EnableAcceleration?: boolean | undefined;
  TunnelInsideIpVersion?: TunnelInsideIpVersion | undefined;
  TunnelOptions?: VpnTunnelOptionsSpecification[] | undefined;
  LocalIpv4NetworkCidr?: string | undefined;
  RemoteIpv4NetworkCidr?: string | undefined;
  LocalIpv6NetworkCidr?: string | undefined;
  RemoteIpv6NetworkCidr?: string | undefined;
  OutsideIpAddressType?: string | undefined;
  TransportTransitGatewayAttachmentId?: string | undefined;
  StaticRoutesOnly?: boolean | undefined;
}
export interface CreateVpnConnectionRequest {
  CustomerGatewayId: string | undefined;
  Type: string | undefined;
  VpnGatewayId?: string | undefined;
  TransitGatewayId?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  Options?: VpnConnectionOptionsSpecification | undefined;
}
export declare const GatewayAssociationState: {
  readonly associated: "associated";
  readonly associating: "associating";
  readonly disassociating: "disassociating";
  readonly not_associated: "not-associated";
};
export type GatewayAssociationState =
  (typeof GatewayAssociationState)[keyof typeof GatewayAssociationState];
export interface IKEVersionsListValue {
  Value?: string | undefined;
}
export interface CloudWatchLogOptions {
  LogEnabled?: boolean | undefined;
  LogGroupArn?: string | undefined;
  LogOutputFormat?: string | undefined;
}
export interface VpnTunnelLogOptions {
  CloudWatchLogOptions?: CloudWatchLogOptions | undefined;
}
export interface Phase1DHGroupNumbersListValue {
  Value?: number | undefined;
}
export interface Phase1EncryptionAlgorithmsListValue {
  Value?: string | undefined;
}
export interface Phase1IntegrityAlgorithmsListValue {
  Value?: string | undefined;
}
export interface Phase2DHGroupNumbersListValue {
  Value?: number | undefined;
}
export interface Phase2EncryptionAlgorithmsListValue {
  Value?: string | undefined;
}
export interface Phase2IntegrityAlgorithmsListValue {
  Value?: string | undefined;
}
export interface TunnelOption {
  OutsideIpAddress?: string | undefined;
  TunnelInsideCidr?: string | undefined;
  TunnelInsideIpv6Cidr?: string | undefined;
  PreSharedKey?: string | undefined;
  Phase1LifetimeSeconds?: number | undefined;
  Phase2LifetimeSeconds?: number | undefined;
  RekeyMarginTimeSeconds?: number | undefined;
  RekeyFuzzPercentage?: number | undefined;
  ReplayWindowSize?: number | undefined;
  DpdTimeoutSeconds?: number | undefined;
  DpdTimeoutAction?: string | undefined;
  Phase1EncryptionAlgorithms?:
    | Phase1EncryptionAlgorithmsListValue[]
    | undefined;
  Phase2EncryptionAlgorithms?:
    | Phase2EncryptionAlgorithmsListValue[]
    | undefined;
  Phase1IntegrityAlgorithms?: Phase1IntegrityAlgorithmsListValue[] | undefined;
  Phase2IntegrityAlgorithms?: Phase2IntegrityAlgorithmsListValue[] | undefined;
  Phase1DHGroupNumbers?: Phase1DHGroupNumbersListValue[] | undefined;
  Phase2DHGroupNumbers?: Phase2DHGroupNumbersListValue[] | undefined;
  IkeVersions?: IKEVersionsListValue[] | undefined;
  StartupAction?: string | undefined;
  LogOptions?: VpnTunnelLogOptions | undefined;
  EnableTunnelLifecycleControl?: boolean | undefined;
}
export interface VpnConnectionOptions {
  EnableAcceleration?: boolean | undefined;
  StaticRoutesOnly?: boolean | undefined;
  LocalIpv4NetworkCidr?: string | undefined;
  RemoteIpv4NetworkCidr?: string | undefined;
  LocalIpv6NetworkCidr?: string | undefined;
  RemoteIpv6NetworkCidr?: string | undefined;
  OutsideIpAddressType?: string | undefined;
  TransportTransitGatewayAttachmentId?: string | undefined;
  TunnelInsideIpVersion?: TunnelInsideIpVersion | undefined;
  TunnelOptions?: TunnelOption[] | undefined;
}
export declare const VpnStaticRouteSource: {
  readonly Static: "Static";
};
export type VpnStaticRouteSource =
  (typeof VpnStaticRouteSource)[keyof typeof VpnStaticRouteSource];
export declare const VpnState: {
  readonly available: "available";
  readonly deleted: "deleted";
  readonly deleting: "deleting";
  readonly pending: "pending";
};
export type VpnState = (typeof VpnState)[keyof typeof VpnState];
export interface VpnStaticRoute {
  DestinationCidrBlock?: string | undefined;
  Source?: VpnStaticRouteSource | undefined;
  State?: VpnState | undefined;
}
export declare const TelemetryStatus: {
  readonly DOWN: "DOWN";
  readonly UP: "UP";
};
export type TelemetryStatus =
  (typeof TelemetryStatus)[keyof typeof TelemetryStatus];
export interface VgwTelemetry {
  AcceptedRouteCount?: number | undefined;
  LastStatusChange?: Date | undefined;
  OutsideIpAddress?: string | undefined;
  Status?: TelemetryStatus | undefined;
  StatusMessage?: string | undefined;
  CertificateArn?: string | undefined;
}
export interface VpnConnection {
  Category?: string | undefined;
  TransitGatewayId?: string | undefined;
  CoreNetworkArn?: string | undefined;
  CoreNetworkAttachmentArn?: string | undefined;
  GatewayAssociationState?: GatewayAssociationState | undefined;
  Options?: VpnConnectionOptions | undefined;
  Routes?: VpnStaticRoute[] | undefined;
  Tags?: Tag[] | undefined;
  VgwTelemetry?: VgwTelemetry[] | undefined;
  VpnConnectionId?: string | undefined;
  State?: VpnState | undefined;
  CustomerGatewayConfiguration?: string | undefined;
  Type?: GatewayType | undefined;
  CustomerGatewayId?: string | undefined;
  VpnGatewayId?: string | undefined;
}
export interface CreateVpnConnectionResult {
  VpnConnection?: VpnConnection | undefined;
}
export interface CreateVpnConnectionRouteRequest {
  DestinationCidrBlock: string | undefined;
  VpnConnectionId: string | undefined;
}
export interface CreateVpnGatewayRequest {
  AvailabilityZone?: string | undefined;
  Type: GatewayType | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  AmazonSideAsn?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface VpnGateway {
  AmazonSideAsn?: number | undefined;
  Tags?: Tag[] | undefined;
  VpnGatewayId?: string | undefined;
  State?: VpnState | undefined;
  Type?: GatewayType | undefined;
  AvailabilityZone?: string | undefined;
  VpcAttachments?: VpcAttachment[] | undefined;
}
export interface CreateVpnGatewayResult {
  VpnGateway?: VpnGateway | undefined;
}
export interface DeleteCarrierGatewayRequest {
  CarrierGatewayId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteCarrierGatewayResult {
  CarrierGateway?: CarrierGateway | undefined;
}
export interface DeleteClientVpnEndpointRequest {
  ClientVpnEndpointId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteClientVpnEndpointResult {
  Status?: ClientVpnEndpointStatus | undefined;
}
export interface DeleteClientVpnRouteRequest {
  ClientVpnEndpointId: string | undefined;
  TargetVpcSubnetId?: string | undefined;
  DestinationCidrBlock: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteClientVpnRouteResult {
  Status?: ClientVpnRouteStatus | undefined;
}
export interface DeleteCoipCidrRequest {
  Cidr: string | undefined;
  CoipPoolId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteCoipCidrResult {
  CoipCidr?: CoipCidr | undefined;
}
export interface DeleteCoipPoolRequest {
  CoipPoolId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteCoipPoolResult {
  CoipPool?: CoipPool | undefined;
}
export interface DeleteCustomerGatewayRequest {
  CustomerGatewayId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteDhcpOptionsRequest {
  DhcpOptionsId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteEgressOnlyInternetGatewayRequest {
  DryRun?: boolean | undefined;
  EgressOnlyInternetGatewayId: string | undefined;
}
export interface DeleteEgressOnlyInternetGatewayResult {
  ReturnCode?: boolean | undefined;
}
export interface DeleteFleetsRequest {
  DryRun?: boolean | undefined;
  FleetIds: string[] | undefined;
  TerminateInstances: boolean | undefined;
}
export declare const FleetStateCode: {
  readonly ACTIVE: "active";
  readonly DELETED: "deleted";
  readonly DELETED_RUNNING: "deleted_running";
  readonly DELETED_TERMINATING_INSTANCES: "deleted_terminating";
  readonly FAILED: "failed";
  readonly MODIFYING: "modifying";
  readonly SUBMITTED: "submitted";
};
export type FleetStateCode =
  (typeof FleetStateCode)[keyof typeof FleetStateCode];
export interface DeleteFleetSuccessItem {
  CurrentFleetState?: FleetStateCode | undefined;
  PreviousFleetState?: FleetStateCode | undefined;
  FleetId?: string | undefined;
}
export declare const DeleteFleetErrorCode: {
  readonly FLEET_ID_DOES_NOT_EXIST: "fleetIdDoesNotExist";
  readonly FLEET_ID_MALFORMED: "fleetIdMalformed";
  readonly FLEET_NOT_IN_DELETABLE_STATE: "fleetNotInDeletableState";
  readonly UNEXPECTED_ERROR: "unexpectedError";
};
export type DeleteFleetErrorCode =
  (typeof DeleteFleetErrorCode)[keyof typeof DeleteFleetErrorCode];
export interface DeleteFleetError {
  Code?: DeleteFleetErrorCode | undefined;
  Message?: string | undefined;
}
export interface DeleteFleetErrorItem {
  Error?: DeleteFleetError | undefined;
  FleetId?: string | undefined;
}
export interface DeleteFleetsResult {
  SuccessfulFleetDeletions?: DeleteFleetSuccessItem[] | undefined;
  UnsuccessfulFleetDeletions?: DeleteFleetErrorItem[] | undefined;
}
export interface DeleteFlowLogsRequest {
  DryRun?: boolean | undefined;
  FlowLogIds: string[] | undefined;
}
export interface DeleteFlowLogsResult {
  Unsuccessful?: UnsuccessfulItem[] | undefined;
}
export interface DeleteFpgaImageRequest {
  DryRun?: boolean | undefined;
  FpgaImageId: string | undefined;
}
export declare const CreateVerifiedAccessTrustProviderOidcOptionsFilterSensitiveLog: (
  obj: CreateVerifiedAccessTrustProviderOidcOptions
) => any;
export declare const CreateVerifiedAccessTrustProviderRequestFilterSensitiveLog: (
  obj: CreateVerifiedAccessTrustProviderRequest
) => any;
export declare const CreateVerifiedAccessTrustProviderResultFilterSensitiveLog: (
  obj: CreateVerifiedAccessTrustProviderResult
) => any;
export declare const VpnTunnelOptionsSpecificationFilterSensitiveLog: (
  obj: VpnTunnelOptionsSpecification
) => any;
export declare const VpnConnectionOptionsSpecificationFilterSensitiveLog: (
  obj: VpnConnectionOptionsSpecification
) => any;
export declare const CreateVpnConnectionRequestFilterSensitiveLog: (
  obj: CreateVpnConnectionRequest
) => any;
export declare const TunnelOptionFilterSensitiveLog: (obj: TunnelOption) => any;
export declare const VpnConnectionOptionsFilterSensitiveLog: (
  obj: VpnConnectionOptions
) => any;
export declare const VpnConnectionFilterSensitiveLog: (
  obj: VpnConnection
) => any;
export declare const CreateVpnConnectionResultFilterSensitiveLog: (
  obj: CreateVpnConnectionResult
) => any;
