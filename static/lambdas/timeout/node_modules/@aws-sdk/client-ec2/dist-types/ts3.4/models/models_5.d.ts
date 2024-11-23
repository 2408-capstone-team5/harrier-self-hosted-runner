import {
  ActiveInstance,
  ActivityStatus,
  AddressTransfer,
  AllocationStrategy,
  AllowedPrincipal,
  AsnAssociation,
  AssociationStatus,
  BatchState,
  IamInstanceProfileAssociation,
  IamInstanceProfileSpecification,
  InstanceEventWindow,
  IpamResourceDiscoveryAssociation,
  IpPermission,
  NatGatewayAddress,
  ResourceType,
  SecurityGroupRule,
  SecurityGroupVpcAssociationState,
  SubnetIpv6CidrBlockAssociation,
  Tag,
  TagSpecification,
  TransitGatewayAssociation,
  TransitGatewayAssociationState,
  TransitGatewayAttachmentResourceType,
  TransitGatewayAttachmentState,
  TransitGatewayMulticastDomainAssociations,
  TransitGatewayPeeringAttachment,
  TransitGatewayPolicyTableAssociation,
  TransitGatewayVpcAttachment,
  TrunkInterfaceAssociation,
  UserIdGroupPair,
  VerifiedAccessInstance,
  VerifiedAccessTrustProvider,
  VpcCidrBlockAssociation,
  VpcIpv6CidrBlockAssociation,
  VpcPeeringConnection,
} from "./models_0";
import {
  _InstanceType,
  BlockDeviceMapping,
  ConnectionTrackingSpecificationRequest,
  EnaSrdSpecificationRequest,
  FleetLaunchTemplateSpecification,
  FleetType,
  InstanceInterruptionBehavior,
  InstanceIpv6Address,
  InstanceRequirements,
  Ipv4PrefixSpecificationRequest,
  Ipv6PrefixSpecificationRequest,
  PrivateIpAddressSpecification,
  SpotInstanceType,
  Subnet,
  TargetCapacityUnitType,
  Tenancy,
  VolumeType,
  Vpc,
} from "./models_1";
import {
  ConnectionNotification,
  DnsEntry,
  DnsNameState,
  GroupIdentifier,
  IpAddressType,
  PayerResponsibility,
  ServiceConfiguration,
  ServiceConnectivityType,
  ServiceTypeDetail,
  Snapshot,
  SnapshotState,
  SpotDatafeedSubscription,
  SpotInstanceStateFault,
  State,
  StorageTier,
  TrafficMirrorFilter,
  TrafficMirrorFilterRule,
  TrafficMirrorSession,
  TrafficMirrorTarget,
  TransitGateway,
  TransitGatewayConnect,
  TransitGatewayConnectPeer,
  TransitGatewayMulticastDomain,
  TransitGatewayPolicyTable,
  TransitGatewayRouteTable,
  TransitGatewayRouteTableAnnouncement,
  VerifiedAccessEndpoint,
  VerifiedAccessGroup,
  Volume,
  VpcBlockPublicAccessExclusion,
  VpcEndpoint,
  VpnConnection,
  VpnGateway,
} from "./models_2";
import {
  EventInformation,
  FastLaunchLaunchTemplateSpecificationResponse,
  FastLaunchResourceType,
  FastLaunchSnapshotConfigurationResponse,
  FastLaunchStateCode,
  FastSnapshotRestoreStateCode,
  Filter,
  MetricType,
  PermissionGroup,
  StatisticType,
} from "./models_3";
import {
  AttributeBooleanValue,
  ProductCode,
  RIProductDescription,
  ScheduledInstanceRecurrence,
} from "./models_4";
export interface ScheduledInstanceAvailability {
  AvailabilityZone?: string | undefined;
  AvailableInstanceCount?: number | undefined;
  FirstSlotStartTime?: Date | undefined;
  HourlyPrice?: string | undefined;
  InstanceType?: string | undefined;
  MaxTermDurationInDays?: number | undefined;
  MinTermDurationInDays?: number | undefined;
  NetworkPlatform?: string | undefined;
  Platform?: string | undefined;
  PurchaseToken?: string | undefined;
  Recurrence?: ScheduledInstanceRecurrence | undefined;
  SlotDurationInHours?: number | undefined;
  TotalScheduledInstanceHours?: number | undefined;
}
export interface DescribeScheduledInstanceAvailabilityResult {
  NextToken?: string | undefined;
  ScheduledInstanceAvailabilitySet?:
    | ScheduledInstanceAvailability[]
    | undefined;
}
export interface SlotStartTimeRangeRequest {
  EarliestTime?: Date | undefined;
  LatestTime?: Date | undefined;
}
export interface DescribeScheduledInstancesRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  ScheduledInstanceIds?: string[] | undefined;
  SlotStartTimeRange?: SlotStartTimeRangeRequest | undefined;
}
export interface ScheduledInstance {
  AvailabilityZone?: string | undefined;
  CreateDate?: Date | undefined;
  HourlyPrice?: string | undefined;
  InstanceCount?: number | undefined;
  InstanceType?: string | undefined;
  NetworkPlatform?: string | undefined;
  NextSlotStartTime?: Date | undefined;
  Platform?: string | undefined;
  PreviousSlotEndTime?: Date | undefined;
  Recurrence?: ScheduledInstanceRecurrence | undefined;
  ScheduledInstanceId?: string | undefined;
  SlotDurationInHours?: number | undefined;
  TermEndDate?: Date | undefined;
  TermStartDate?: Date | undefined;
  TotalScheduledInstanceHours?: number | undefined;
}
export interface DescribeScheduledInstancesResult {
  NextToken?: string | undefined;
  ScheduledInstanceSet?: ScheduledInstance[] | undefined;
}
export interface DescribeSecurityGroupReferencesRequest {
  DryRun?: boolean | undefined;
  GroupId: string[] | undefined;
}
export interface SecurityGroupReference {
  GroupId?: string | undefined;
  ReferencingVpcId?: string | undefined;
  VpcPeeringConnectionId?: string | undefined;
  TransitGatewayId?: string | undefined;
}
export interface DescribeSecurityGroupReferencesResult {
  SecurityGroupReferenceSet?: SecurityGroupReference[] | undefined;
}
export interface DescribeSecurityGroupRulesRequest {
  Filters?: Filter[] | undefined;
  SecurityGroupRuleIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeSecurityGroupRulesResult {
  SecurityGroupRules?: SecurityGroupRule[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSecurityGroupsRequest {
  GroupIds?: string[] | undefined;
  GroupNames?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface SecurityGroup {
  GroupId?: string | undefined;
  IpPermissionsEgress?: IpPermission[] | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
  SecurityGroupArn?: string | undefined;
  OwnerId?: string | undefined;
  GroupName?: string | undefined;
  Description?: string | undefined;
  IpPermissions?: IpPermission[] | undefined;
}
export interface DescribeSecurityGroupsResult {
  NextToken?: string | undefined;
  SecurityGroups?: SecurityGroup[] | undefined;
}
export interface DescribeSecurityGroupVpcAssociationsRequest {
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface SecurityGroupVpcAssociation {
  GroupId?: string | undefined;
  VpcId?: string | undefined;
  VpcOwnerId?: string | undefined;
  State?: SecurityGroupVpcAssociationState | undefined;
  StateReason?: string | undefined;
}
export interface DescribeSecurityGroupVpcAssociationsResult {
  SecurityGroupVpcAssociations?: SecurityGroupVpcAssociation[] | undefined;
  NextToken?: string | undefined;
}
export declare const SnapshotAttributeName: {
  readonly createVolumePermission: "createVolumePermission";
  readonly productCodes: "productCodes";
};
export type SnapshotAttributeName =
  (typeof SnapshotAttributeName)[keyof typeof SnapshotAttributeName];
export interface DescribeSnapshotAttributeRequest {
  Attribute: SnapshotAttributeName | undefined;
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface CreateVolumePermission {
  UserId?: string | undefined;
  Group?: PermissionGroup | undefined;
}
export interface DescribeSnapshotAttributeResult {
  ProductCodes?: ProductCode[] | undefined;
  SnapshotId?: string | undefined;
  CreateVolumePermissions?: CreateVolumePermission[] | undefined;
}
export interface DescribeSnapshotsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  OwnerIds?: string[] | undefined;
  RestorableByUserIds?: string[] | undefined;
  SnapshotIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeSnapshotsResult {
  NextToken?: string | undefined;
  Snapshots?: Snapshot[] | undefined;
}
export interface DescribeSnapshotTierStatusRequest {
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const TieringOperationStatus: {
  readonly archival_completed: "archival-completed";
  readonly archival_failed: "archival-failed";
  readonly archival_in_progress: "archival-in-progress";
  readonly permanent_restore_completed: "permanent-restore-completed";
  readonly permanent_restore_failed: "permanent-restore-failed";
  readonly permanent_restore_in_progress: "permanent-restore-in-progress";
  readonly temporary_restore_completed: "temporary-restore-completed";
  readonly temporary_restore_failed: "temporary-restore-failed";
  readonly temporary_restore_in_progress: "temporary-restore-in-progress";
};
export type TieringOperationStatus =
  (typeof TieringOperationStatus)[keyof typeof TieringOperationStatus];
export interface SnapshotTierStatus {
  SnapshotId?: string | undefined;
  VolumeId?: string | undefined;
  Status?: SnapshotState | undefined;
  OwnerId?: string | undefined;
  Tags?: Tag[] | undefined;
  StorageTier?: StorageTier | undefined;
  LastTieringStartTime?: Date | undefined;
  LastTieringProgress?: number | undefined;
  LastTieringOperationStatus?: TieringOperationStatus | undefined;
  LastTieringOperationStatusDetail?: string | undefined;
  ArchivalCompleteTime?: Date | undefined;
  RestoreExpiryTime?: Date | undefined;
}
export interface DescribeSnapshotTierStatusResult {
  SnapshotTierStatuses?: SnapshotTierStatus[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSpotDatafeedSubscriptionRequest {
  DryRun?: boolean | undefined;
}
export interface DescribeSpotDatafeedSubscriptionResult {
  SpotDatafeedSubscription?: SpotDatafeedSubscription | undefined;
}
export interface DescribeSpotFleetInstancesRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeSpotFleetInstancesResponse {
  ActiveInstances?: ActiveInstance[] | undefined;
  NextToken?: string | undefined;
  SpotFleetRequestId?: string | undefined;
}
export declare const EventType: {
  readonly BATCH_CHANGE: "fleetRequestChange";
  readonly ERROR: "error";
  readonly INFORMATION: "information";
  readonly INSTANCE_CHANGE: "instanceChange";
};
export type EventType = (typeof EventType)[keyof typeof EventType];
export interface DescribeSpotFleetRequestHistoryRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestId: string | undefined;
  EventType?: EventType | undefined;
  StartTime: Date | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface HistoryRecord {
  EventInformation?: EventInformation | undefined;
  EventType?: EventType | undefined;
  Timestamp?: Date | undefined;
}
export interface DescribeSpotFleetRequestHistoryResponse {
  HistoryRecords?: HistoryRecord[] | undefined;
  LastEvaluatedTime?: Date | undefined;
  NextToken?: string | undefined;
  SpotFleetRequestId?: string | undefined;
  StartTime?: Date | undefined;
}
export interface DescribeSpotFleetRequestsRequest {
  DryRun?: boolean | undefined;
  SpotFleetRequestIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const ExcessCapacityTerminationPolicy: {
  readonly DEFAULT: "default";
  readonly NO_TERMINATION: "noTermination";
};
export type ExcessCapacityTerminationPolicy =
  (typeof ExcessCapacityTerminationPolicy)[keyof typeof ExcessCapacityTerminationPolicy];
export interface SpotFleetMonitoring {
  Enabled?: boolean | undefined;
}
export interface InstanceNetworkInterfaceSpecification {
  AssociatePublicIpAddress?: boolean | undefined;
  DeleteOnTermination?: boolean | undefined;
  Description?: string | undefined;
  DeviceIndex?: number | undefined;
  Groups?: string[] | undefined;
  Ipv6AddressCount?: number | undefined;
  Ipv6Addresses?: InstanceIpv6Address[] | undefined;
  NetworkInterfaceId?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PrivateIpAddresses?: PrivateIpAddressSpecification[] | undefined;
  SecondaryPrivateIpAddressCount?: number | undefined;
  SubnetId?: string | undefined;
  AssociateCarrierIpAddress?: boolean | undefined;
  InterfaceType?: string | undefined;
  NetworkCardIndex?: number | undefined;
  Ipv4Prefixes?: Ipv4PrefixSpecificationRequest[] | undefined;
  Ipv4PrefixCount?: number | undefined;
  Ipv6Prefixes?: Ipv6PrefixSpecificationRequest[] | undefined;
  Ipv6PrefixCount?: number | undefined;
  PrimaryIpv6?: boolean | undefined;
  EnaSrdSpecification?: EnaSrdSpecificationRequest | undefined;
  ConnectionTrackingSpecification?:
    | ConnectionTrackingSpecificationRequest
    | undefined;
}
export interface SpotPlacement {
  AvailabilityZone?: string | undefined;
  GroupName?: string | undefined;
  Tenancy?: Tenancy | undefined;
}
export interface SpotFleetTagSpecification {
  ResourceType?: ResourceType | undefined;
  Tags?: Tag[] | undefined;
}
export interface SpotFleetLaunchSpecification {
  AddressingType?: string | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: IamInstanceProfileSpecification | undefined;
  ImageId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  Monitoring?: SpotFleetMonitoring | undefined;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[] | undefined;
  Placement?: SpotPlacement | undefined;
  RamdiskId?: string | undefined;
  SpotPrice?: string | undefined;
  SubnetId?: string | undefined;
  UserData?: string | undefined;
  WeightedCapacity?: number | undefined;
  TagSpecifications?: SpotFleetTagSpecification[] | undefined;
  InstanceRequirements?: InstanceRequirements | undefined;
  SecurityGroups?: GroupIdentifier[] | undefined;
}
export interface LaunchTemplateOverrides {
  InstanceType?: _InstanceType | undefined;
  SpotPrice?: string | undefined;
  SubnetId?: string | undefined;
  AvailabilityZone?: string | undefined;
  WeightedCapacity?: number | undefined;
  Priority?: number | undefined;
  InstanceRequirements?: InstanceRequirements | undefined;
}
export interface LaunchTemplateConfig {
  LaunchTemplateSpecification?: FleetLaunchTemplateSpecification | undefined;
  Overrides?: LaunchTemplateOverrides[] | undefined;
}
export interface ClassicLoadBalancer {
  Name?: string | undefined;
}
export interface ClassicLoadBalancersConfig {
  ClassicLoadBalancers?: ClassicLoadBalancer[] | undefined;
}
export interface TargetGroup {
  Arn?: string | undefined;
}
export interface TargetGroupsConfig {
  TargetGroups?: TargetGroup[] | undefined;
}
export interface LoadBalancersConfig {
  ClassicLoadBalancersConfig?: ClassicLoadBalancersConfig | undefined;
  TargetGroupsConfig?: TargetGroupsConfig | undefined;
}
export declare const OnDemandAllocationStrategy: {
  readonly LOWEST_PRICE: "lowestPrice";
  readonly PRIORITIZED: "prioritized";
};
export type OnDemandAllocationStrategy =
  (typeof OnDemandAllocationStrategy)[keyof typeof OnDemandAllocationStrategy];
export declare const ReplacementStrategy: {
  readonly LAUNCH: "launch";
  readonly LAUNCH_BEFORE_TERMINATE: "launch-before-terminate";
};
export type ReplacementStrategy =
  (typeof ReplacementStrategy)[keyof typeof ReplacementStrategy];
export interface SpotCapacityRebalance {
  ReplacementStrategy?: ReplacementStrategy | undefined;
  TerminationDelay?: number | undefined;
}
export interface SpotMaintenanceStrategies {
  CapacityRebalance?: SpotCapacityRebalance | undefined;
}
export interface SpotFleetRequestConfigData {
  AllocationStrategy?: AllocationStrategy | undefined;
  OnDemandAllocationStrategy?: OnDemandAllocationStrategy | undefined;
  SpotMaintenanceStrategies?: SpotMaintenanceStrategies | undefined;
  ClientToken?: string | undefined;
  ExcessCapacityTerminationPolicy?: ExcessCapacityTerminationPolicy | undefined;
  FulfilledCapacity?: number | undefined;
  OnDemandFulfilledCapacity?: number | undefined;
  IamFleetRole: string | undefined;
  LaunchSpecifications?: SpotFleetLaunchSpecification[] | undefined;
  LaunchTemplateConfigs?: LaunchTemplateConfig[] | undefined;
  SpotPrice?: string | undefined;
  TargetCapacity: number | undefined;
  OnDemandTargetCapacity?: number | undefined;
  OnDemandMaxTotalPrice?: string | undefined;
  SpotMaxTotalPrice?: string | undefined;
  TerminateInstancesWithExpiration?: boolean | undefined;
  Type?: FleetType | undefined;
  ValidFrom?: Date | undefined;
  ValidUntil?: Date | undefined;
  ReplaceUnhealthyInstances?: boolean | undefined;
  InstanceInterruptionBehavior?: InstanceInterruptionBehavior | undefined;
  LoadBalancersConfig?: LoadBalancersConfig | undefined;
  InstancePoolsToUseCount?: number | undefined;
  Context?: string | undefined;
  TargetCapacityUnitType?: TargetCapacityUnitType | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface SpotFleetRequestConfig {
  ActivityStatus?: ActivityStatus | undefined;
  CreateTime?: Date | undefined;
  SpotFleetRequestConfig?: SpotFleetRequestConfigData | undefined;
  SpotFleetRequestId?: string | undefined;
  SpotFleetRequestState?: BatchState | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeSpotFleetRequestsResponse {
  NextToken?: string | undefined;
  SpotFleetRequestConfigs?: SpotFleetRequestConfig[] | undefined;
}
export interface DescribeSpotInstanceRequestsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  SpotInstanceRequestIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface RunInstancesMonitoringEnabled {
  Enabled: boolean | undefined;
}
export interface LaunchSpecification {
  UserData?: string | undefined;
  AddressingType?: string | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  EbsOptimized?: boolean | undefined;
  IamInstanceProfile?: IamInstanceProfileSpecification | undefined;
  ImageId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  KernelId?: string | undefined;
  KeyName?: string | undefined;
  NetworkInterfaces?: InstanceNetworkInterfaceSpecification[] | undefined;
  Placement?: SpotPlacement | undefined;
  RamdiskId?: string | undefined;
  SubnetId?: string | undefined;
  SecurityGroups?: GroupIdentifier[] | undefined;
  Monitoring?: RunInstancesMonitoringEnabled | undefined;
}
export declare const SpotInstanceState: {
  readonly active: "active";
  readonly cancelled: "cancelled";
  readonly closed: "closed";
  readonly disabled: "disabled";
  readonly failed: "failed";
  readonly open: "open";
};
export type SpotInstanceState =
  (typeof SpotInstanceState)[keyof typeof SpotInstanceState];
export interface SpotInstanceStatus {
  Code?: string | undefined;
  Message?: string | undefined;
  UpdateTime?: Date | undefined;
}
export interface SpotInstanceRequest {
  ActualBlockHourlyPrice?: string | undefined;
  AvailabilityZoneGroup?: string | undefined;
  BlockDurationMinutes?: number | undefined;
  CreateTime?: Date | undefined;
  Fault?: SpotInstanceStateFault | undefined;
  InstanceId?: string | undefined;
  LaunchGroup?: string | undefined;
  LaunchSpecification?: LaunchSpecification | undefined;
  LaunchedAvailabilityZone?: string | undefined;
  ProductDescription?: RIProductDescription | undefined;
  SpotInstanceRequestId?: string | undefined;
  SpotPrice?: string | undefined;
  State?: SpotInstanceState | undefined;
  Status?: SpotInstanceStatus | undefined;
  Tags?: Tag[] | undefined;
  Type?: SpotInstanceType | undefined;
  ValidFrom?: Date | undefined;
  ValidUntil?: Date | undefined;
  InstanceInterruptionBehavior?: InstanceInterruptionBehavior | undefined;
}
export interface DescribeSpotInstanceRequestsResult {
  SpotInstanceRequests?: SpotInstanceRequest[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSpotPriceHistoryRequest {
  DryRun?: boolean | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  InstanceTypes?: _InstanceType[] | undefined;
  ProductDescriptions?: string[] | undefined;
  Filters?: Filter[] | undefined;
  AvailabilityZone?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface SpotPrice {
  AvailabilityZone?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  ProductDescription?: RIProductDescription | undefined;
  SpotPrice?: string | undefined;
  Timestamp?: Date | undefined;
}
export interface DescribeSpotPriceHistoryResult {
  NextToken?: string | undefined;
  SpotPriceHistory?: SpotPrice[] | undefined;
}
export interface DescribeStaleSecurityGroupsRequest {
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  VpcId: string | undefined;
}
export interface StaleIpPermission {
  FromPort?: number | undefined;
  IpProtocol?: string | undefined;
  IpRanges?: string[] | undefined;
  PrefixListIds?: string[] | undefined;
  ToPort?: number | undefined;
  UserIdGroupPairs?: UserIdGroupPair[] | undefined;
}
export interface StaleSecurityGroup {
  Description?: string | undefined;
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  StaleIpPermissions?: StaleIpPermission[] | undefined;
  StaleIpPermissionsEgress?: StaleIpPermission[] | undefined;
  VpcId?: string | undefined;
}
export interface DescribeStaleSecurityGroupsResult {
  NextToken?: string | undefined;
  StaleSecurityGroupSet?: StaleSecurityGroup[] | undefined;
}
export interface DescribeStoreImageTasksRequest {
  ImageIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface StoreImageTaskResult {
  AmiId?: string | undefined;
  TaskStartTime?: Date | undefined;
  Bucket?: string | undefined;
  S3objectKey?: string | undefined;
  ProgressPercentage?: number | undefined;
  StoreTaskState?: string | undefined;
  StoreTaskFailureReason?: string | undefined;
}
export interface DescribeStoreImageTasksResult {
  StoreImageTaskResults?: StoreImageTaskResult[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeSubnetsRequest {
  Filters?: Filter[] | undefined;
  SubnetIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeSubnetsResult {
  NextToken?: string | undefined;
  Subnets?: Subnet[] | undefined;
}
export interface DescribeTagsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface TagDescription {
  Key?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: ResourceType | undefined;
  Value?: string | undefined;
}
export interface DescribeTagsResult {
  NextToken?: string | undefined;
  Tags?: TagDescription[] | undefined;
}
export interface DescribeTrafficMirrorFilterRulesRequest {
  TrafficMirrorFilterRuleIds?: string[] | undefined;
  TrafficMirrorFilterId?: string | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorFilterRulesResult {
  TrafficMirrorFilterRules?: TrafficMirrorFilterRule[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorFiltersRequest {
  TrafficMirrorFilterIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorFiltersResult {
  TrafficMirrorFilters?: TrafficMirrorFilter[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorSessionsRequest {
  TrafficMirrorSessionIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorSessionsResult {
  TrafficMirrorSessions?: TrafficMirrorSession[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorTargetsRequest {
  TrafficMirrorTargetIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrafficMirrorTargetsResult {
  TrafficMirrorTargets?: TrafficMirrorTarget[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayAttachmentsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayAttachmentAssociation {
  TransitGatewayRouteTableId?: string | undefined;
  State?: TransitGatewayAssociationState | undefined;
}
export interface TransitGatewayAttachment {
  TransitGatewayAttachmentId?: string | undefined;
  TransitGatewayId?: string | undefined;
  TransitGatewayOwnerId?: string | undefined;
  ResourceOwnerId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  ResourceId?: string | undefined;
  State?: TransitGatewayAttachmentState | undefined;
  Association?: TransitGatewayAttachmentAssociation | undefined;
  CreationTime?: Date | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeTransitGatewayAttachmentsResult {
  TransitGatewayAttachments?: TransitGatewayAttachment[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayConnectPeersRequest {
  TransitGatewayConnectPeerIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayConnectPeersResult {
  TransitGatewayConnectPeers?: TransitGatewayConnectPeer[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayConnectsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayConnectsResult {
  TransitGatewayConnects?: TransitGatewayConnect[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayMulticastDomainsRequest {
  TransitGatewayMulticastDomainIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayMulticastDomainsResult {
  TransitGatewayMulticastDomains?: TransitGatewayMulticastDomain[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayPeeringAttachmentsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayPeeringAttachmentsResult {
  TransitGatewayPeeringAttachments?:
    | TransitGatewayPeeringAttachment[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayPolicyTablesRequest {
  TransitGatewayPolicyTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayPolicyTablesResult {
  TransitGatewayPolicyTables?: TransitGatewayPolicyTable[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayRouteTableAnnouncementsRequest {
  TransitGatewayRouteTableAnnouncementIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayRouteTableAnnouncementsResult {
  TransitGatewayRouteTableAnnouncements?:
    | TransitGatewayRouteTableAnnouncement[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayRouteTablesRequest {
  TransitGatewayRouteTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayRouteTablesResult {
  TransitGatewayRouteTables?: TransitGatewayRouteTable[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewaysRequest {
  TransitGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewaysResult {
  TransitGateways?: TransitGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTransitGatewayVpcAttachmentsRequest {
  TransitGatewayAttachmentIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeTransitGatewayVpcAttachmentsResult {
  TransitGatewayVpcAttachments?: TransitGatewayVpcAttachment[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeTrunkInterfaceAssociationsRequest {
  AssociationIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeTrunkInterfaceAssociationsResult {
  InterfaceAssociations?: TrunkInterfaceAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessEndpointsRequest {
  VerifiedAccessEndpointIds?: string[] | undefined;
  VerifiedAccessInstanceId?: string | undefined;
  VerifiedAccessGroupId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessEndpointsResult {
  VerifiedAccessEndpoints?: VerifiedAccessEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessGroupsRequest {
  VerifiedAccessGroupIds?: string[] | undefined;
  VerifiedAccessInstanceId?: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessGroupsResult {
  VerifiedAccessGroups?: VerifiedAccessGroup[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessInstanceLoggingConfigurationsRequest {
  VerifiedAccessInstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const VerifiedAccessLogDeliveryStatusCode: {
  readonly FAILED: "failed";
  readonly SUCCESS: "success";
};
export type VerifiedAccessLogDeliveryStatusCode =
  (typeof VerifiedAccessLogDeliveryStatusCode)[keyof typeof VerifiedAccessLogDeliveryStatusCode];
export interface VerifiedAccessLogDeliveryStatus {
  Code?: VerifiedAccessLogDeliveryStatusCode | undefined;
  Message?: string | undefined;
}
export interface VerifiedAccessLogCloudWatchLogsDestination {
  Enabled?: boolean | undefined;
  DeliveryStatus?: VerifiedAccessLogDeliveryStatus | undefined;
  LogGroup?: string | undefined;
}
export interface VerifiedAccessLogKinesisDataFirehoseDestination {
  Enabled?: boolean | undefined;
  DeliveryStatus?: VerifiedAccessLogDeliveryStatus | undefined;
  DeliveryStream?: string | undefined;
}
export interface VerifiedAccessLogS3Destination {
  Enabled?: boolean | undefined;
  DeliveryStatus?: VerifiedAccessLogDeliveryStatus | undefined;
  BucketName?: string | undefined;
  Prefix?: string | undefined;
  BucketOwner?: string | undefined;
}
export interface VerifiedAccessLogs {
  S3?: VerifiedAccessLogS3Destination | undefined;
  CloudWatchLogs?: VerifiedAccessLogCloudWatchLogsDestination | undefined;
  KinesisDataFirehose?:
    | VerifiedAccessLogKinesisDataFirehoseDestination
    | undefined;
  LogVersion?: string | undefined;
  IncludeTrustContext?: boolean | undefined;
}
export interface VerifiedAccessInstanceLoggingConfiguration {
  VerifiedAccessInstanceId?: string | undefined;
  AccessLogs?: VerifiedAccessLogs | undefined;
}
export interface DescribeVerifiedAccessInstanceLoggingConfigurationsResult {
  LoggingConfigurations?:
    | VerifiedAccessInstanceLoggingConfiguration[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessInstancesRequest {
  VerifiedAccessInstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessInstancesResult {
  VerifiedAccessInstances?: VerifiedAccessInstance[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVerifiedAccessTrustProvidersRequest {
  VerifiedAccessTrustProviderIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVerifiedAccessTrustProvidersResult {
  VerifiedAccessTrustProviders?: VerifiedAccessTrustProvider[] | undefined;
  NextToken?: string | undefined;
}
export declare const VolumeAttributeName: {
  readonly autoEnableIO: "autoEnableIO";
  readonly productCodes: "productCodes";
};
export type VolumeAttributeName =
  (typeof VolumeAttributeName)[keyof typeof VolumeAttributeName];
export interface DescribeVolumeAttributeRequest {
  Attribute: VolumeAttributeName | undefined;
  VolumeId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVolumeAttributeResult {
  AutoEnableIO?: AttributeBooleanValue | undefined;
  ProductCodes?: ProductCode[] | undefined;
  VolumeId?: string | undefined;
}
export interface DescribeVolumesRequest {
  VolumeIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeVolumesResult {
  NextToken?: string | undefined;
  Volumes?: Volume[] | undefined;
}
export interface DescribeVolumesModificationsRequest {
  DryRun?: boolean | undefined;
  VolumeIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const VolumeModificationState: {
  readonly completed: "completed";
  readonly failed: "failed";
  readonly modifying: "modifying";
  readonly optimizing: "optimizing";
};
export type VolumeModificationState =
  (typeof VolumeModificationState)[keyof typeof VolumeModificationState];
export interface VolumeModification {
  VolumeId?: string | undefined;
  ModificationState?: VolumeModificationState | undefined;
  StatusMessage?: string | undefined;
  TargetSize?: number | undefined;
  TargetIops?: number | undefined;
  TargetVolumeType?: VolumeType | undefined;
  TargetThroughput?: number | undefined;
  TargetMultiAttachEnabled?: boolean | undefined;
  OriginalSize?: number | undefined;
  OriginalIops?: number | undefined;
  OriginalVolumeType?: VolumeType | undefined;
  OriginalThroughput?: number | undefined;
  OriginalMultiAttachEnabled?: boolean | undefined;
  Progress?: number | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
}
export interface DescribeVolumesModificationsResult {
  NextToken?: string | undefined;
  VolumesModifications?: VolumeModification[] | undefined;
}
export interface DescribeVolumeStatusRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  VolumeIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface VolumeStatusAction {
  Code?: string | undefined;
  Description?: string | undefined;
  EventId?: string | undefined;
  EventType?: string | undefined;
}
export interface VolumeStatusAttachmentStatus {
  IoPerformance?: string | undefined;
  InstanceId?: string | undefined;
}
export interface VolumeStatusEvent {
  Description?: string | undefined;
  EventId?: string | undefined;
  EventType?: string | undefined;
  NotAfter?: Date | undefined;
  NotBefore?: Date | undefined;
  InstanceId?: string | undefined;
}
export declare const VolumeStatusName: {
  readonly io_enabled: "io-enabled";
  readonly io_performance: "io-performance";
};
export type VolumeStatusName =
  (typeof VolumeStatusName)[keyof typeof VolumeStatusName];
export interface VolumeStatusDetails {
  Name?: VolumeStatusName | undefined;
  Status?: string | undefined;
}
export declare const VolumeStatusInfoStatus: {
  readonly impaired: "impaired";
  readonly insufficient_data: "insufficient-data";
  readonly ok: "ok";
};
export type VolumeStatusInfoStatus =
  (typeof VolumeStatusInfoStatus)[keyof typeof VolumeStatusInfoStatus];
export interface VolumeStatusInfo {
  Details?: VolumeStatusDetails[] | undefined;
  Status?: VolumeStatusInfoStatus | undefined;
}
export interface VolumeStatusItem {
  Actions?: VolumeStatusAction[] | undefined;
  AvailabilityZone?: string | undefined;
  OutpostArn?: string | undefined;
  Events?: VolumeStatusEvent[] | undefined;
  VolumeId?: string | undefined;
  VolumeStatus?: VolumeStatusInfo | undefined;
  AttachmentStatuses?: VolumeStatusAttachmentStatus[] | undefined;
}
export interface DescribeVolumeStatusResult {
  NextToken?: string | undefined;
  VolumeStatuses?: VolumeStatusItem[] | undefined;
}
export declare const VpcAttributeName: {
  readonly enableDnsHostnames: "enableDnsHostnames";
  readonly enableDnsSupport: "enableDnsSupport";
  readonly enableNetworkAddressUsageMetrics: "enableNetworkAddressUsageMetrics";
};
export type VpcAttributeName =
  (typeof VpcAttributeName)[keyof typeof VpcAttributeName];
export interface DescribeVpcAttributeRequest {
  Attribute: VpcAttributeName | undefined;
  VpcId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVpcAttributeResult {
  EnableDnsHostnames?: AttributeBooleanValue | undefined;
  EnableDnsSupport?: AttributeBooleanValue | undefined;
  EnableNetworkAddressUsageMetrics?: AttributeBooleanValue | undefined;
  VpcId?: string | undefined;
}
export interface DescribeVpcBlockPublicAccessExclusionsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  ExclusionIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeVpcBlockPublicAccessExclusionsResult {
  VpcBlockPublicAccessExclusions?: VpcBlockPublicAccessExclusion[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcBlockPublicAccessOptionsRequest {
  DryRun?: boolean | undefined;
}
export declare const InternetGatewayBlockMode: {
  readonly block_bidirectional: "block-bidirectional";
  readonly block_ingress: "block-ingress";
  readonly off: "off";
};
export type InternetGatewayBlockMode =
  (typeof InternetGatewayBlockMode)[keyof typeof InternetGatewayBlockMode];
export declare const VpcBlockPublicAccessState: {
  readonly default_state: "default-state";
  readonly update_complete: "update-complete";
  readonly update_in_progress: "update-in-progress";
};
export type VpcBlockPublicAccessState =
  (typeof VpcBlockPublicAccessState)[keyof typeof VpcBlockPublicAccessState];
export interface VpcBlockPublicAccessOptions {
  AwsAccountId?: string | undefined;
  AwsRegion?: string | undefined;
  State?: VpcBlockPublicAccessState | undefined;
  InternetGatewayBlockMode?: InternetGatewayBlockMode | undefined;
  Reason?: string | undefined;
  LastUpdateTimestamp?: Date | undefined;
}
export interface DescribeVpcBlockPublicAccessOptionsResult {
  VpcBlockPublicAccessOptions?: VpcBlockPublicAccessOptions | undefined;
}
export interface DescribeVpcClassicLinkRequest {
  DryRun?: boolean | undefined;
  VpcIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface VpcClassicLink {
  ClassicLinkEnabled?: boolean | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
}
export interface DescribeVpcClassicLinkResult {
  Vpcs?: VpcClassicLink[] | undefined;
}
export interface DescribeVpcClassicLinkDnsSupportRequest {
  VpcIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ClassicLinkDnsSupport {
  ClassicLinkDnsSupported?: boolean | undefined;
  VpcId?: string | undefined;
}
export interface DescribeVpcClassicLinkDnsSupportResult {
  NextToken?: string | undefined;
  Vpcs?: ClassicLinkDnsSupport[] | undefined;
}
export interface DescribeVpcEndpointConnectionNotificationsRequest {
  DryRun?: boolean | undefined;
  ConnectionNotificationId?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointConnectionNotificationsResult {
  ConnectionNotificationSet?: ConnectionNotification[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointConnectionsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface VpcEndpointConnection {
  ServiceId?: string | undefined;
  VpcEndpointId?: string | undefined;
  VpcEndpointOwner?: string | undefined;
  VpcEndpointState?: State | undefined;
  CreationTimestamp?: Date | undefined;
  DnsEntries?: DnsEntry[] | undefined;
  NetworkLoadBalancerArns?: string[] | undefined;
  GatewayLoadBalancerArns?: string[] | undefined;
  IpAddressType?: IpAddressType | undefined;
  VpcEndpointConnectionId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeVpcEndpointConnectionsResult {
  VpcEndpointConnections?: VpcEndpointConnection[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointsRequest {
  DryRun?: boolean | undefined;
  VpcEndpointIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointsResult {
  VpcEndpoints?: VpcEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServiceConfigurationsRequest {
  DryRun?: boolean | undefined;
  ServiceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServiceConfigurationsResult {
  ServiceConfigurations?: ServiceConfiguration[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServicePermissionsRequest {
  DryRun?: boolean | undefined;
  ServiceId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServicePermissionsResult {
  AllowedPrincipals?: AllowedPrincipal[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcEndpointServicesRequest {
  DryRun?: boolean | undefined;
  ServiceNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface PrivateDnsDetails {
  PrivateDnsName?: string | undefined;
}
export interface ServiceDetail {
  ServiceName?: string | undefined;
  ServiceId?: string | undefined;
  ServiceType?: ServiceTypeDetail[] | undefined;
  AvailabilityZones?: string[] | undefined;
  Owner?: string | undefined;
  BaseEndpointDnsNames?: string[] | undefined;
  PrivateDnsName?: string | undefined;
  PrivateDnsNames?: PrivateDnsDetails[] | undefined;
  VpcEndpointPolicySupported?: boolean | undefined;
  AcceptanceRequired?: boolean | undefined;
  ManagesVpcEndpoints?: boolean | undefined;
  PayerResponsibility?: PayerResponsibility | undefined;
  Tags?: Tag[] | undefined;
  PrivateDnsNameVerificationState?: DnsNameState | undefined;
  SupportedIpAddressTypes?: ServiceConnectivityType[] | undefined;
}
export interface DescribeVpcEndpointServicesResult {
  ServiceNames?: string[] | undefined;
  ServiceDetails?: ServiceDetail[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcPeeringConnectionsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  VpcPeeringConnectionIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeVpcPeeringConnectionsResult {
  VpcPeeringConnections?: VpcPeeringConnection[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeVpcsRequest {
  Filters?: Filter[] | undefined;
  VpcIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVpcsResult {
  NextToken?: string | undefined;
  Vpcs?: Vpc[] | undefined;
}
export interface DescribeVpnConnectionsRequest {
  Filters?: Filter[] | undefined;
  VpnConnectionIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVpnConnectionsResult {
  VpnConnections?: VpnConnection[] | undefined;
}
export interface DescribeVpnGatewaysRequest {
  Filters?: Filter[] | undefined;
  VpnGatewayIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeVpnGatewaysResult {
  VpnGateways?: VpnGateway[] | undefined;
}
export interface DetachClassicLinkVpcRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  VpcId: string | undefined;
}
export interface DetachClassicLinkVpcResult {
  Return?: boolean | undefined;
}
export interface DetachInternetGatewayRequest {
  DryRun?: boolean | undefined;
  InternetGatewayId: string | undefined;
  VpcId: string | undefined;
}
export interface DetachNetworkInterfaceRequest {
  DryRun?: boolean | undefined;
  AttachmentId: string | undefined;
  Force?: boolean | undefined;
}
export interface DetachVerifiedAccessTrustProviderRequest {
  VerifiedAccessInstanceId: string | undefined;
  VerifiedAccessTrustProviderId: string | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DetachVerifiedAccessTrustProviderResult {
  VerifiedAccessTrustProvider?: VerifiedAccessTrustProvider | undefined;
  VerifiedAccessInstance?: VerifiedAccessInstance | undefined;
}
export interface DetachVolumeRequest {
  Device?: string | undefined;
  Force?: boolean | undefined;
  InstanceId?: string | undefined;
  VolumeId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DetachVpnGatewayRequest {
  VpcId: string | undefined;
  VpnGatewayId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableAddressTransferRequest {
  AllocationId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableAddressTransferResult {
  AddressTransfer?: AddressTransfer | undefined;
}
export interface DisableAwsNetworkPerformanceMetricSubscriptionRequest {
  Source?: string | undefined;
  Destination?: string | undefined;
  Metric?: MetricType | undefined;
  Statistic?: StatisticType | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableAwsNetworkPerformanceMetricSubscriptionResult {
  Output?: boolean | undefined;
}
export interface DisableEbsEncryptionByDefaultRequest {
  DryRun?: boolean | undefined;
}
export interface DisableEbsEncryptionByDefaultResult {
  EbsEncryptionByDefault?: boolean | undefined;
}
export interface DisableFastLaunchRequest {
  ImageId: string | undefined;
  Force?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableFastLaunchResult {
  ImageId?: string | undefined;
  ResourceType?: FastLaunchResourceType | undefined;
  SnapshotConfiguration?: FastLaunchSnapshotConfigurationResponse | undefined;
  LaunchTemplate?: FastLaunchLaunchTemplateSpecificationResponse | undefined;
  MaxParallelLaunches?: number | undefined;
  OwnerId?: string | undefined;
  State?: FastLaunchStateCode | undefined;
  StateTransitionReason?: string | undefined;
  StateTransitionTime?: Date | undefined;
}
export interface DisableFastSnapshotRestoresRequest {
  AvailabilityZones: string[] | undefined;
  SourceSnapshotIds: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableFastSnapshotRestoreSuccessItem {
  SnapshotId?: string | undefined;
  AvailabilityZone?: string | undefined;
  State?: FastSnapshotRestoreStateCode | undefined;
  StateTransitionReason?: string | undefined;
  OwnerId?: string | undefined;
  OwnerAlias?: string | undefined;
  EnablingTime?: Date | undefined;
  OptimizingTime?: Date | undefined;
  EnabledTime?: Date | undefined;
  DisablingTime?: Date | undefined;
  DisabledTime?: Date | undefined;
}
export interface DisableFastSnapshotRestoreStateError {
  Code?: string | undefined;
  Message?: string | undefined;
}
export interface DisableFastSnapshotRestoreStateErrorItem {
  AvailabilityZone?: string | undefined;
  Error?: DisableFastSnapshotRestoreStateError | undefined;
}
export interface DisableFastSnapshotRestoreErrorItem {
  SnapshotId?: string | undefined;
  FastSnapshotRestoreStateErrors?:
    | DisableFastSnapshotRestoreStateErrorItem[]
    | undefined;
}
export interface DisableFastSnapshotRestoresResult {
  Successful?: DisableFastSnapshotRestoreSuccessItem[] | undefined;
  Unsuccessful?: DisableFastSnapshotRestoreErrorItem[] | undefined;
}
export interface DisableImageRequest {
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableImageResult {
  Return?: boolean | undefined;
}
export interface DisableImageBlockPublicAccessRequest {
  DryRun?: boolean | undefined;
}
export declare const ImageBlockPublicAccessDisabledState: {
  readonly unblocked: "unblocked";
};
export type ImageBlockPublicAccessDisabledState =
  (typeof ImageBlockPublicAccessDisabledState)[keyof typeof ImageBlockPublicAccessDisabledState];
export interface DisableImageBlockPublicAccessResult {
  ImageBlockPublicAccessState?: ImageBlockPublicAccessDisabledState | undefined;
}
export interface DisableImageDeprecationRequest {
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableImageDeprecationResult {
  Return?: boolean | undefined;
}
export interface DisableImageDeregistrationProtectionRequest {
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableImageDeregistrationProtectionResult {
  Return?: string | undefined;
}
export interface DisableIpamOrganizationAdminAccountRequest {
  DryRun?: boolean | undefined;
  DelegatedAdminAccountId: string | undefined;
}
export interface DisableIpamOrganizationAdminAccountResult {
  Success?: boolean | undefined;
}
export interface DisableSerialConsoleAccessRequest {
  DryRun?: boolean | undefined;
}
export interface DisableSerialConsoleAccessResult {
  SerialConsoleAccessEnabled?: boolean | undefined;
}
export interface DisableSnapshotBlockPublicAccessRequest {
  DryRun?: boolean | undefined;
}
export declare const SnapshotBlockPublicAccessState: {
  readonly block_all_sharing: "block-all-sharing";
  readonly block_new_sharing: "block-new-sharing";
  readonly unblocked: "unblocked";
};
export type SnapshotBlockPublicAccessState =
  (typeof SnapshotBlockPublicAccessState)[keyof typeof SnapshotBlockPublicAccessState];
export interface DisableSnapshotBlockPublicAccessResult {
  State?: SnapshotBlockPublicAccessState | undefined;
}
export interface DisableTransitGatewayRouteTablePropagationRequest {
  TransitGatewayRouteTableId: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  DryRun?: boolean | undefined;
  TransitGatewayRouteTableAnnouncementId?: string | undefined;
}
export declare const TransitGatewayPropagationState: {
  readonly disabled: "disabled";
  readonly disabling: "disabling";
  readonly enabled: "enabled";
  readonly enabling: "enabling";
};
export type TransitGatewayPropagationState =
  (typeof TransitGatewayPropagationState)[keyof typeof TransitGatewayPropagationState];
export interface TransitGatewayPropagation {
  TransitGatewayAttachmentId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  TransitGatewayRouteTableId?: string | undefined;
  State?: TransitGatewayPropagationState | undefined;
  TransitGatewayRouteTableAnnouncementId?: string | undefined;
}
export interface DisableTransitGatewayRouteTablePropagationResult {
  Propagation?: TransitGatewayPropagation | undefined;
}
export interface DisableVgwRoutePropagationRequest {
  GatewayId: string | undefined;
  RouteTableId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisableVpcClassicLinkRequest {
  DryRun?: boolean | undefined;
  VpcId: string | undefined;
}
export interface DisableVpcClassicLinkResult {
  Return?: boolean | undefined;
}
export interface DisableVpcClassicLinkDnsSupportRequest {
  VpcId?: string | undefined;
}
export interface DisableVpcClassicLinkDnsSupportResult {
  Return?: boolean | undefined;
}
export interface DisassociateAddressRequest {
  AssociationId?: string | undefined;
  PublicIp?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateCapacityReservationBillingOwnerRequest {
  DryRun?: boolean | undefined;
  CapacityReservationId: string | undefined;
  UnusedReservationBillingOwnerId: string | undefined;
}
export interface DisassociateCapacityReservationBillingOwnerResult {
  Return?: boolean | undefined;
}
export interface DisassociateClientVpnTargetNetworkRequest {
  ClientVpnEndpointId: string | undefined;
  AssociationId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateClientVpnTargetNetworkResult {
  AssociationId?: string | undefined;
  Status?: AssociationStatus | undefined;
}
export interface DisassociateEnclaveCertificateIamRoleRequest {
  CertificateArn: string | undefined;
  RoleArn: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateEnclaveCertificateIamRoleResult {
  Return?: boolean | undefined;
}
export interface DisassociateIamInstanceProfileRequest {
  AssociationId: string | undefined;
}
export interface DisassociateIamInstanceProfileResult {
  IamInstanceProfileAssociation?: IamInstanceProfileAssociation | undefined;
}
export interface InstanceEventWindowDisassociationRequest {
  InstanceIds?: string[] | undefined;
  InstanceTags?: Tag[] | undefined;
  DedicatedHostIds?: string[] | undefined;
}
export interface DisassociateInstanceEventWindowRequest {
  DryRun?: boolean | undefined;
  InstanceEventWindowId: string | undefined;
  AssociationTarget: InstanceEventWindowDisassociationRequest | undefined;
}
export interface DisassociateInstanceEventWindowResult {
  InstanceEventWindow?: InstanceEventWindow | undefined;
}
export interface DisassociateIpamByoasnRequest {
  DryRun?: boolean | undefined;
  Asn: string | undefined;
  Cidr: string | undefined;
}
export interface DisassociateIpamByoasnResult {
  AsnAssociation?: AsnAssociation | undefined;
}
export interface DisassociateIpamResourceDiscoveryRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryAssociationId: string | undefined;
}
export interface DisassociateIpamResourceDiscoveryResult {
  IpamResourceDiscoveryAssociation?:
    | IpamResourceDiscoveryAssociation
    | undefined;
}
export interface DisassociateNatGatewayAddressRequest {
  NatGatewayId: string | undefined;
  AssociationIds: string[] | undefined;
  MaxDrainDurationSeconds?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateNatGatewayAddressResult {
  NatGatewayId?: string | undefined;
  NatGatewayAddresses?: NatGatewayAddress[] | undefined;
}
export interface DisassociateRouteTableRequest {
  DryRun?: boolean | undefined;
  AssociationId: string | undefined;
}
export interface DisassociateSecurityGroupVpcRequest {
  GroupId: string | undefined;
  VpcId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateSecurityGroupVpcResult {
  State?: SecurityGroupVpcAssociationState | undefined;
}
export interface DisassociateSubnetCidrBlockRequest {
  AssociationId: string | undefined;
}
export interface DisassociateSubnetCidrBlockResult {
  Ipv6CidrBlockAssociation?: SubnetIpv6CidrBlockAssociation | undefined;
  SubnetId?: string | undefined;
}
export interface DisassociateTransitGatewayMulticastDomainRequest {
  TransitGatewayMulticastDomainId: string | undefined;
  TransitGatewayAttachmentId: string | undefined;
  SubnetIds: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateTransitGatewayMulticastDomainResult {
  Associations?: TransitGatewayMulticastDomainAssociations | undefined;
}
export interface DisassociateTransitGatewayPolicyTableRequest {
  TransitGatewayPolicyTableId: string | undefined;
  TransitGatewayAttachmentId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateTransitGatewayPolicyTableResult {
  Association?: TransitGatewayPolicyTableAssociation | undefined;
}
export interface DisassociateTransitGatewayRouteTableRequest {
  TransitGatewayRouteTableId: string | undefined;
  TransitGatewayAttachmentId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateTransitGatewayRouteTableResult {
  Association?: TransitGatewayAssociation | undefined;
}
export interface DisassociateTrunkInterfaceRequest {
  AssociationId: string | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DisassociateTrunkInterfaceResult {
  Return?: boolean | undefined;
  ClientToken?: string | undefined;
}
export interface DisassociateVpcCidrBlockRequest {
  AssociationId: string | undefined;
}
export interface DisassociateVpcCidrBlockResult {
  Ipv6CidrBlockAssociation?: VpcIpv6CidrBlockAssociation | undefined;
  CidrBlockAssociation?: VpcCidrBlockAssociation | undefined;
  VpcId?: string | undefined;
}
export interface EnableAddressTransferRequest {
  AllocationId: string | undefined;
  TransferAccountId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableAddressTransferResult {
  AddressTransfer?: AddressTransfer | undefined;
}
export interface EnableAwsNetworkPerformanceMetricSubscriptionRequest {
  Source?: string | undefined;
  Destination?: string | undefined;
  Metric?: MetricType | undefined;
  Statistic?: StatisticType | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableAwsNetworkPerformanceMetricSubscriptionResult {
  Output?: boolean | undefined;
}
export interface EnableEbsEncryptionByDefaultRequest {
  DryRun?: boolean | undefined;
}
export interface EnableEbsEncryptionByDefaultResult {
  EbsEncryptionByDefault?: boolean | undefined;
}
export interface FastLaunchLaunchTemplateSpecificationRequest {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Version: string | undefined;
}
export interface FastLaunchSnapshotConfigurationRequest {
  TargetResourceCount?: number | undefined;
}
export interface EnableFastLaunchRequest {
  ImageId: string | undefined;
  ResourceType?: string | undefined;
  SnapshotConfiguration?: FastLaunchSnapshotConfigurationRequest | undefined;
  LaunchTemplate?: FastLaunchLaunchTemplateSpecificationRequest | undefined;
  MaxParallelLaunches?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableFastLaunchResult {
  ImageId?: string | undefined;
  ResourceType?: FastLaunchResourceType | undefined;
  SnapshotConfiguration?: FastLaunchSnapshotConfigurationResponse | undefined;
  LaunchTemplate?: FastLaunchLaunchTemplateSpecificationResponse | undefined;
  MaxParallelLaunches?: number | undefined;
  OwnerId?: string | undefined;
  State?: FastLaunchStateCode | undefined;
  StateTransitionReason?: string | undefined;
  StateTransitionTime?: Date | undefined;
}
export interface EnableFastSnapshotRestoresRequest {
  AvailabilityZones: string[] | undefined;
  SourceSnapshotIds: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableFastSnapshotRestoreSuccessItem {
  SnapshotId?: string | undefined;
  AvailabilityZone?: string | undefined;
  State?: FastSnapshotRestoreStateCode | undefined;
  StateTransitionReason?: string | undefined;
  OwnerId?: string | undefined;
  OwnerAlias?: string | undefined;
  EnablingTime?: Date | undefined;
  OptimizingTime?: Date | undefined;
  EnabledTime?: Date | undefined;
  DisablingTime?: Date | undefined;
  DisabledTime?: Date | undefined;
}
export interface EnableFastSnapshotRestoreStateError {
  Code?: string | undefined;
  Message?: string | undefined;
}
export interface EnableFastSnapshotRestoreStateErrorItem {
  AvailabilityZone?: string | undefined;
  Error?: EnableFastSnapshotRestoreStateError | undefined;
}
export interface EnableFastSnapshotRestoreErrorItem {
  SnapshotId?: string | undefined;
  FastSnapshotRestoreStateErrors?:
    | EnableFastSnapshotRestoreStateErrorItem[]
    | undefined;
}
export interface EnableFastSnapshotRestoresResult {
  Successful?: EnableFastSnapshotRestoreSuccessItem[] | undefined;
  Unsuccessful?: EnableFastSnapshotRestoreErrorItem[] | undefined;
}
export interface EnableImageRequest {
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableImageResult {
  Return?: boolean | undefined;
}
export declare const ImageBlockPublicAccessEnabledState: {
  readonly block_new_sharing: "block-new-sharing";
};
export type ImageBlockPublicAccessEnabledState =
  (typeof ImageBlockPublicAccessEnabledState)[keyof typeof ImageBlockPublicAccessEnabledState];
export interface EnableImageBlockPublicAccessRequest {
  ImageBlockPublicAccessState: ImageBlockPublicAccessEnabledState | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableImageBlockPublicAccessResult {
  ImageBlockPublicAccessState?: ImageBlockPublicAccessEnabledState | undefined;
}
export interface EnableImageDeprecationRequest {
  ImageId: string | undefined;
  DeprecateAt: Date | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableImageDeprecationResult {
  Return?: boolean | undefined;
}
export interface EnableImageDeregistrationProtectionRequest {
  ImageId: string | undefined;
  WithCooldown?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableImageDeregistrationProtectionResult {
  Return?: string | undefined;
}
export interface EnableIpamOrganizationAdminAccountRequest {
  DryRun?: boolean | undefined;
  DelegatedAdminAccountId: string | undefined;
}
export interface EnableIpamOrganizationAdminAccountResult {
  Success?: boolean | undefined;
}
export interface EnableReachabilityAnalyzerOrganizationSharingRequest {
  DryRun?: boolean | undefined;
}
export interface EnableReachabilityAnalyzerOrganizationSharingResult {
  ReturnValue?: boolean | undefined;
}
export interface EnableSerialConsoleAccessRequest {
  DryRun?: boolean | undefined;
}
export interface EnableSerialConsoleAccessResult {
  SerialConsoleAccessEnabled?: boolean | undefined;
}
export interface EnableSnapshotBlockPublicAccessRequest {
  State: SnapshotBlockPublicAccessState | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableSnapshotBlockPublicAccessResult {
  State?: SnapshotBlockPublicAccessState | undefined;
}
export interface EnableTransitGatewayRouteTablePropagationRequest {
  TransitGatewayRouteTableId: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
  DryRun?: boolean | undefined;
  TransitGatewayRouteTableAnnouncementId?: string | undefined;
}
export interface EnableTransitGatewayRouteTablePropagationResult {
  Propagation?: TransitGatewayPropagation | undefined;
}
export declare const SpotFleetLaunchSpecificationFilterSensitiveLog: (
  obj: SpotFleetLaunchSpecification
) => any;
export declare const SpotFleetRequestConfigDataFilterSensitiveLog: (
  obj: SpotFleetRequestConfigData
) => any;
export declare const SpotFleetRequestConfigFilterSensitiveLog: (
  obj: SpotFleetRequestConfig
) => any;
export declare const DescribeSpotFleetRequestsResponseFilterSensitiveLog: (
  obj: DescribeSpotFleetRequestsResponse
) => any;
export declare const LaunchSpecificationFilterSensitiveLog: (
  obj: LaunchSpecification
) => any;
export declare const SpotInstanceRequestFilterSensitiveLog: (
  obj: SpotInstanceRequest
) => any;
export declare const DescribeSpotInstanceRequestsResultFilterSensitiveLog: (
  obj: DescribeSpotInstanceRequestsResult
) => any;
export declare const DescribeVerifiedAccessTrustProvidersResultFilterSensitiveLog: (
  obj: DescribeVerifiedAccessTrustProvidersResult
) => any;
export declare const DescribeVpnConnectionsResultFilterSensitiveLog: (
  obj: DescribeVpnConnectionsResult
) => any;
export declare const DetachVerifiedAccessTrustProviderResultFilterSensitiveLog: (
  obj: DetachVerifiedAccessTrustProviderResult
) => any;
