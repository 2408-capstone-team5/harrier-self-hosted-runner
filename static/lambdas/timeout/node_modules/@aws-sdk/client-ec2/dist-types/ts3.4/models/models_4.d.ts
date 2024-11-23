import {
  AllocationState,
  AllowsMultipleInstanceTypes,
  AlternatePathHint,
  AttachmentStatus,
  AutoPlacement,
  CurrencyCodeValues,
  Explanation,
  HostMaintenance,
  HostRecovery,
  IamInstanceProfile,
  IamInstanceProfileAssociation,
  InstanceEventWindow,
  IpamResourceDiscoveryAssociation,
  PathComponent,
  ReservedInstancesListing,
  Tag,
} from "./models_0";
import {
  _InstanceType,
  AmdSevSnpSpecification,
  AttributeValue,
  BlockDeviceMapping,
  CapacityReservationPreference,
  CapacityReservationTargetResponse,
  Ec2InstanceConnectEndpoint,
  HostnameType,
  InstanceIpv6Address,
  InternetGateway,
  Ipam,
  IpamExternalResourceVerificationToken,
  IpamPool,
  IpamResourceDiscovery,
  IpamScope,
  KeyType,
  LaunchTemplate,
  LaunchTemplateVersion,
  LocalGatewayRouteTable,
  LocalGatewayRouteTableVirtualInterfaceGroupAssociation,
  LocalGatewayRouteTableVpcAssociation,
  ManagedPrefixList,
  OperatorResponse,
  Placement,
  PlatformValues,
  StateReason,
  Tenancy,
} from "./models_1";
import {
  GroupIdentifier,
  NatGateway,
  NetworkAcl,
  NetworkInsightsAccessScope,
  NetworkInsightsPath,
  NetworkInterface,
  NetworkInterfaceAttachment,
  NetworkInterfacePermission,
  NetworkInterfaceStatus,
  PlacementGroup,
  ReplaceRootVolumeTask,
  RouteTable,
} from "./models_2";
import {
  Byoasn,
  Filter,
  IdFormat,
  InstanceTagNotificationAttribute,
  LoadPermission,
  PermissionGroup,
  ProductCodeValues,
} from "./models_3";
export interface ProductCode {
  ProductCodeId?: string | undefined;
  ProductCodeType?: ProductCodeValues | undefined;
}
export interface FpgaImageAttribute {
  FpgaImageId?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  LoadPermissions?: LoadPermission[] | undefined;
  ProductCodes?: ProductCode[] | undefined;
}
export interface DescribeFpgaImageAttributeResult {
  FpgaImageAttribute?: FpgaImageAttribute | undefined;
}
export interface DescribeFpgaImagesRequest {
  DryRun?: boolean | undefined;
  FpgaImageIds?: string[] | undefined;
  Owners?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface PciId {
  DeviceId?: string | undefined;
  VendorId?: string | undefined;
  SubsystemId?: string | undefined;
  SubsystemVendorId?: string | undefined;
}
export declare const FpgaImageStateCode: {
  readonly available: "available";
  readonly failed: "failed";
  readonly pending: "pending";
  readonly unavailable: "unavailable";
};
export type FpgaImageStateCode =
  (typeof FpgaImageStateCode)[keyof typeof FpgaImageStateCode];
export interface FpgaImageState {
  Code?: FpgaImageStateCode | undefined;
  Message?: string | undefined;
}
export interface FpgaImage {
  FpgaImageId?: string | undefined;
  FpgaImageGlobalId?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  ShellVersion?: string | undefined;
  PciId?: PciId | undefined;
  State?: FpgaImageState | undefined;
  CreateTime?: Date | undefined;
  UpdateTime?: Date | undefined;
  OwnerId?: string | undefined;
  OwnerAlias?: string | undefined;
  ProductCodes?: ProductCode[] | undefined;
  Tags?: Tag[] | undefined;
  Public?: boolean | undefined;
  DataRetentionSupport?: boolean | undefined;
  InstanceTypes?: string[] | undefined;
}
export interface DescribeFpgaImagesResult {
  FpgaImages?: FpgaImage[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeHostReservationOfferingsRequest {
  Filter?: Filter[] | undefined;
  MaxDuration?: number | undefined;
  MaxResults?: number | undefined;
  MinDuration?: number | undefined;
  NextToken?: string | undefined;
  OfferingId?: string | undefined;
}
export declare const PaymentOption: {
  readonly ALL_UPFRONT: "AllUpfront";
  readonly NO_UPFRONT: "NoUpfront";
  readonly PARTIAL_UPFRONT: "PartialUpfront";
};
export type PaymentOption = (typeof PaymentOption)[keyof typeof PaymentOption];
export interface HostOffering {
  CurrencyCode?: CurrencyCodeValues | undefined;
  Duration?: number | undefined;
  HourlyPrice?: string | undefined;
  InstanceFamily?: string | undefined;
  OfferingId?: string | undefined;
  PaymentOption?: PaymentOption | undefined;
  UpfrontPrice?: string | undefined;
}
export interface DescribeHostReservationOfferingsResult {
  NextToken?: string | undefined;
  OfferingSet?: HostOffering[] | undefined;
}
export interface DescribeHostReservationsRequest {
  Filter?: Filter[] | undefined;
  HostReservationIdSet?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export declare const ReservationState: {
  readonly ACTIVE: "active";
  readonly PAYMENT_FAILED: "payment-failed";
  readonly PAYMENT_PENDING: "payment-pending";
  readonly RETIRED: "retired";
};
export type ReservationState =
  (typeof ReservationState)[keyof typeof ReservationState];
export interface HostReservation {
  Count?: number | undefined;
  CurrencyCode?: CurrencyCodeValues | undefined;
  Duration?: number | undefined;
  End?: Date | undefined;
  HostIdSet?: string[] | undefined;
  HostReservationId?: string | undefined;
  HourlyPrice?: string | undefined;
  InstanceFamily?: string | undefined;
  OfferingId?: string | undefined;
  PaymentOption?: PaymentOption | undefined;
  Start?: Date | undefined;
  State?: ReservationState | undefined;
  UpfrontPrice?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeHostReservationsResult {
  HostReservationSet?: HostReservation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeHostsRequest {
  HostIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filter?: Filter[] | undefined;
}
export interface InstanceCapacity {
  AvailableCapacity?: number | undefined;
  InstanceType?: string | undefined;
  TotalCapacity?: number | undefined;
}
export interface AvailableCapacity {
  AvailableInstanceCapacity?: InstanceCapacity[] | undefined;
  AvailableVCpus?: number | undefined;
}
export interface HostProperties {
  Cores?: number | undefined;
  InstanceType?: string | undefined;
  InstanceFamily?: string | undefined;
  Sockets?: number | undefined;
  TotalVCpus?: number | undefined;
}
export interface HostInstance {
  InstanceId?: string | undefined;
  InstanceType?: string | undefined;
  OwnerId?: string | undefined;
}
export interface Host {
  AutoPlacement?: AutoPlacement | undefined;
  AvailabilityZone?: string | undefined;
  AvailableCapacity?: AvailableCapacity | undefined;
  ClientToken?: string | undefined;
  HostId?: string | undefined;
  HostProperties?: HostProperties | undefined;
  HostReservationId?: string | undefined;
  Instances?: HostInstance[] | undefined;
  State?: AllocationState | undefined;
  AllocationTime?: Date | undefined;
  ReleaseTime?: Date | undefined;
  Tags?: Tag[] | undefined;
  HostRecovery?: HostRecovery | undefined;
  AllowsMultipleInstanceTypes?: AllowsMultipleInstanceTypes | undefined;
  OwnerId?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  MemberOfServiceLinkedResourceGroup?: boolean | undefined;
  OutpostArn?: string | undefined;
  HostMaintenance?: HostMaintenance | undefined;
  AssetId?: string | undefined;
}
export interface DescribeHostsResult {
  Hosts?: Host[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIamInstanceProfileAssociationsRequest {
  AssociationIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIamInstanceProfileAssociationsResult {
  IamInstanceProfileAssociations?: IamInstanceProfileAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIdentityIdFormatRequest {
  Resource?: string | undefined;
  PrincipalArn: string | undefined;
}
export interface DescribeIdentityIdFormatResult {
  Statuses?: IdFormat[] | undefined;
}
export interface DescribeIdFormatRequest {
  Resource?: string | undefined;
}
export interface DescribeIdFormatResult {
  Statuses?: IdFormat[] | undefined;
}
export declare const ImageAttributeName: {
  readonly blockDeviceMapping: "blockDeviceMapping";
  readonly bootMode: "bootMode";
  readonly deregistrationProtection: "deregistrationProtection";
  readonly description: "description";
  readonly imdsSupport: "imdsSupport";
  readonly kernel: "kernel";
  readonly lastLaunchedTime: "lastLaunchedTime";
  readonly launchPermission: "launchPermission";
  readonly productCodes: "productCodes";
  readonly ramdisk: "ramdisk";
  readonly sriovNetSupport: "sriovNetSupport";
  readonly tpmSupport: "tpmSupport";
  readonly uefiData: "uefiData";
};
export type ImageAttributeName =
  (typeof ImageAttributeName)[keyof typeof ImageAttributeName];
export interface DescribeImageAttributeRequest {
  Attribute: ImageAttributeName | undefined;
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface LaunchPermission {
  OrganizationArn?: string | undefined;
  OrganizationalUnitArn?: string | undefined;
  UserId?: string | undefined;
  Group?: PermissionGroup | undefined;
}
export interface ImageAttribute {
  Description?: AttributeValue | undefined;
  KernelId?: AttributeValue | undefined;
  RamdiskId?: AttributeValue | undefined;
  SriovNetSupport?: AttributeValue | undefined;
  BootMode?: AttributeValue | undefined;
  TpmSupport?: AttributeValue | undefined;
  UefiData?: AttributeValue | undefined;
  LastLaunchedTime?: AttributeValue | undefined;
  ImdsSupport?: AttributeValue | undefined;
  DeregistrationProtection?: AttributeValue | undefined;
  ImageId?: string | undefined;
  LaunchPermissions?: LaunchPermission[] | undefined;
  ProductCodes?: ProductCode[] | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
}
export interface DescribeImagesRequest {
  ExecutableUsers?: string[] | undefined;
  ImageIds?: string[] | undefined;
  Owners?: string[] | undefined;
  IncludeDeprecated?: boolean | undefined;
  IncludeDisabled?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export declare const ArchitectureValues: {
  readonly arm64: "arm64";
  readonly arm64_mac: "arm64_mac";
  readonly i386: "i386";
  readonly x86_64: "x86_64";
  readonly x86_64_mac: "x86_64_mac";
};
export type ArchitectureValues =
  (typeof ArchitectureValues)[keyof typeof ArchitectureValues];
export declare const BootModeValues: {
  readonly legacy_bios: "legacy-bios";
  readonly uefi: "uefi";
  readonly uefi_preferred: "uefi-preferred";
};
export type BootModeValues =
  (typeof BootModeValues)[keyof typeof BootModeValues];
export declare const HypervisorType: {
  readonly ovm: "ovm";
  readonly xen: "xen";
};
export type HypervisorType =
  (typeof HypervisorType)[keyof typeof HypervisorType];
export declare const ImageTypeValues: {
  readonly kernel: "kernel";
  readonly machine: "machine";
  readonly ramdisk: "ramdisk";
};
export type ImageTypeValues =
  (typeof ImageTypeValues)[keyof typeof ImageTypeValues];
export declare const ImdsSupportValues: {
  readonly v2_0: "v2.0";
};
export type ImdsSupportValues =
  (typeof ImdsSupportValues)[keyof typeof ImdsSupportValues];
export declare const DeviceType: {
  readonly ebs: "ebs";
  readonly instance_store: "instance-store";
};
export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];
export declare const ImageState: {
  readonly available: "available";
  readonly deregistered: "deregistered";
  readonly disabled: "disabled";
  readonly error: "error";
  readonly failed: "failed";
  readonly invalid: "invalid";
  readonly pending: "pending";
  readonly transient: "transient";
};
export type ImageState = (typeof ImageState)[keyof typeof ImageState];
export declare const TpmSupportValues: {
  readonly v2_0: "v2.0";
};
export type TpmSupportValues =
  (typeof TpmSupportValues)[keyof typeof TpmSupportValues];
export declare const VirtualizationType: {
  readonly hvm: "hvm";
  readonly paravirtual: "paravirtual";
};
export type VirtualizationType =
  (typeof VirtualizationType)[keyof typeof VirtualizationType];
export interface Image {
  PlatformDetails?: string | undefined;
  UsageOperation?: string | undefined;
  BlockDeviceMappings?: BlockDeviceMapping[] | undefined;
  Description?: string | undefined;
  EnaSupport?: boolean | undefined;
  Hypervisor?: HypervisorType | undefined;
  ImageOwnerAlias?: string | undefined;
  Name?: string | undefined;
  RootDeviceName?: string | undefined;
  RootDeviceType?: DeviceType | undefined;
  SriovNetSupport?: string | undefined;
  StateReason?: StateReason | undefined;
  Tags?: Tag[] | undefined;
  VirtualizationType?: VirtualizationType | undefined;
  BootMode?: BootModeValues | undefined;
  TpmSupport?: TpmSupportValues | undefined;
  DeprecationTime?: string | undefined;
  ImdsSupport?: ImdsSupportValues | undefined;
  SourceInstanceId?: string | undefined;
  DeregistrationProtection?: string | undefined;
  LastLaunchedTime?: string | undefined;
  SourceImageId?: string | undefined;
  SourceImageRegion?: string | undefined;
  ImageId?: string | undefined;
  ImageLocation?: string | undefined;
  State?: ImageState | undefined;
  OwnerId?: string | undefined;
  CreationDate?: string | undefined;
  Public?: boolean | undefined;
  ProductCodes?: ProductCode[] | undefined;
  Architecture?: ArchitectureValues | undefined;
  ImageType?: ImageTypeValues | undefined;
  KernelId?: string | undefined;
  RamdiskId?: string | undefined;
  Platform?: PlatformValues | undefined;
}
export interface DescribeImagesResult {
  NextToken?: string | undefined;
  Images?: Image[] | undefined;
}
export interface DescribeImportImageTasksRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  ImportTaskIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ImportImageLicenseConfigurationResponse {
  LicenseConfigurationArn?: string | undefined;
}
export interface UserBucketDetails {
  S3Bucket?: string | undefined;
  S3Key?: string | undefined;
}
export interface SnapshotDetail {
  Description?: string | undefined;
  DeviceName?: string | undefined;
  DiskImageSize?: number | undefined;
  Format?: string | undefined;
  Progress?: string | undefined;
  SnapshotId?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  Url?: string | undefined;
  UserBucket?: UserBucketDetails | undefined;
}
export interface ImportImageTask {
  Architecture?: string | undefined;
  Description?: string | undefined;
  Encrypted?: boolean | undefined;
  Hypervisor?: string | undefined;
  ImageId?: string | undefined;
  ImportTaskId?: string | undefined;
  KmsKeyId?: string | undefined;
  LicenseType?: string | undefined;
  Platform?: string | undefined;
  Progress?: string | undefined;
  SnapshotDetails?: SnapshotDetail[] | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  Tags?: Tag[] | undefined;
  LicenseSpecifications?: ImportImageLicenseConfigurationResponse[] | undefined;
  UsageOperation?: string | undefined;
  BootMode?: BootModeValues | undefined;
}
export interface DescribeImportImageTasksResult {
  ImportImageTasks?: ImportImageTask[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeImportSnapshotTasksRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  ImportTaskIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface SnapshotTaskDetail {
  Description?: string | undefined;
  DiskImageSize?: number | undefined;
  Encrypted?: boolean | undefined;
  Format?: string | undefined;
  KmsKeyId?: string | undefined;
  Progress?: string | undefined;
  SnapshotId?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  Url?: string | undefined;
  UserBucket?: UserBucketDetails | undefined;
}
export interface ImportSnapshotTask {
  Description?: string | undefined;
  ImportTaskId?: string | undefined;
  SnapshotTaskDetail?: SnapshotTaskDetail | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeImportSnapshotTasksResult {
  ImportSnapshotTasks?: ImportSnapshotTask[] | undefined;
  NextToken?: string | undefined;
}
export declare const InstanceAttributeName: {
  readonly blockDeviceMapping: "blockDeviceMapping";
  readonly disableApiStop: "disableApiStop";
  readonly disableApiTermination: "disableApiTermination";
  readonly ebsOptimized: "ebsOptimized";
  readonly enaSupport: "enaSupport";
  readonly enclaveOptions: "enclaveOptions";
  readonly groupSet: "groupSet";
  readonly instanceInitiatedShutdownBehavior: "instanceInitiatedShutdownBehavior";
  readonly instanceType: "instanceType";
  readonly kernel: "kernel";
  readonly productCodes: "productCodes";
  readonly ramdisk: "ramdisk";
  readonly rootDeviceName: "rootDeviceName";
  readonly sourceDestCheck: "sourceDestCheck";
  readonly sriovNetSupport: "sriovNetSupport";
  readonly userData: "userData";
};
export type InstanceAttributeName =
  (typeof InstanceAttributeName)[keyof typeof InstanceAttributeName];
export interface DescribeInstanceAttributeRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  Attribute: InstanceAttributeName | undefined;
}
export interface EbsInstanceBlockDevice {
  AttachTime?: Date | undefined;
  DeleteOnTermination?: boolean | undefined;
  Status?: AttachmentStatus | undefined;
  VolumeId?: string | undefined;
  AssociatedResource?: string | undefined;
  VolumeOwnerId?: string | undefined;
  Operator?: OperatorResponse | undefined;
}
export interface InstanceBlockDeviceMapping {
  DeviceName?: string | undefined;
  Ebs?: EbsInstanceBlockDevice | undefined;
}
export interface AttributeBooleanValue {
  Value?: boolean | undefined;
}
export interface EnclaveOptions {
  Enabled?: boolean | undefined;
}
export interface InstanceAttribute {
  BlockDeviceMappings?: InstanceBlockDeviceMapping[] | undefined;
  DisableApiTermination?: AttributeBooleanValue | undefined;
  EnaSupport?: AttributeBooleanValue | undefined;
  EnclaveOptions?: EnclaveOptions | undefined;
  EbsOptimized?: AttributeBooleanValue | undefined;
  InstanceId?: string | undefined;
  InstanceInitiatedShutdownBehavior?: AttributeValue | undefined;
  InstanceType?: AttributeValue | undefined;
  KernelId?: AttributeValue | undefined;
  ProductCodes?: ProductCode[] | undefined;
  RamdiskId?: AttributeValue | undefined;
  RootDeviceName?: AttributeValue | undefined;
  SourceDestCheck?: AttributeBooleanValue | undefined;
  SriovNetSupport?: AttributeValue | undefined;
  UserData?: AttributeValue | undefined;
  DisableApiStop?: AttributeBooleanValue | undefined;
  Groups?: GroupIdentifier[] | undefined;
}
export interface DescribeInstanceConnectEndpointsRequest {
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  InstanceConnectEndpointIds?: string[] | undefined;
}
export interface DescribeInstanceConnectEndpointsResult {
  InstanceConnectEndpoints?: Ec2InstanceConnectEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceCreditSpecificationsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  InstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface InstanceCreditSpecification {
  InstanceId?: string | undefined;
  CpuCredits?: string | undefined;
}
export interface DescribeInstanceCreditSpecificationsResult {
  InstanceCreditSpecifications?: InstanceCreditSpecification[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceEventNotificationAttributesRequest {
  DryRun?: boolean | undefined;
}
export interface DescribeInstanceEventNotificationAttributesResult {
  InstanceTagAttribute?: InstanceTagNotificationAttribute | undefined;
}
export interface DescribeInstanceEventWindowsRequest {
  DryRun?: boolean | undefined;
  InstanceEventWindowIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceEventWindowsResult {
  InstanceEventWindows?: InstanceEventWindow[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceImageMetadataRequest {
  Filters?: Filter[] | undefined;
  InstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ImageMetadata {
  ImageId?: string | undefined;
  Name?: string | undefined;
  OwnerId?: string | undefined;
  State?: ImageState | undefined;
  ImageOwnerAlias?: string | undefined;
  CreationDate?: string | undefined;
  DeprecationTime?: string | undefined;
  IsPublic?: boolean | undefined;
}
export declare const InstanceStateName: {
  readonly pending: "pending";
  readonly running: "running";
  readonly shutting_down: "shutting-down";
  readonly stopped: "stopped";
  readonly stopping: "stopping";
  readonly terminated: "terminated";
};
export type InstanceStateName =
  (typeof InstanceStateName)[keyof typeof InstanceStateName];
export interface InstanceState {
  Code?: number | undefined;
  Name?: InstanceStateName | undefined;
}
export interface InstanceImageMetadata {
  InstanceId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  LaunchTime?: Date | undefined;
  AvailabilityZone?: string | undefined;
  ZoneId?: string | undefined;
  State?: InstanceState | undefined;
  OwnerId?: string | undefined;
  Tags?: Tag[] | undefined;
  ImageMetadata?: ImageMetadata | undefined;
  Operator?: OperatorResponse | undefined;
}
export interface DescribeInstanceImageMetadataResult {
  InstanceImageMetadata?: InstanceImageMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstancesRequest {
  InstanceIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface CapacityReservationSpecificationResponse {
  CapacityReservationPreference?: CapacityReservationPreference | undefined;
  CapacityReservationTarget?: CapacityReservationTargetResponse | undefined;
}
export interface CpuOptions {
  CoreCount?: number | undefined;
  ThreadsPerCore?: number | undefined;
  AmdSevSnp?: AmdSevSnpSpecification | undefined;
}
export declare const InstanceBootModeValues: {
  readonly legacy_bios: "legacy-bios";
  readonly uefi: "uefi";
};
export type InstanceBootModeValues =
  (typeof InstanceBootModeValues)[keyof typeof InstanceBootModeValues];
export interface ElasticGpuAssociation {
  ElasticGpuId?: string | undefined;
  ElasticGpuAssociationId?: string | undefined;
  ElasticGpuAssociationState?: string | undefined;
  ElasticGpuAssociationTime?: string | undefined;
}
export interface ElasticInferenceAcceleratorAssociation {
  ElasticInferenceAcceleratorArn?: string | undefined;
  ElasticInferenceAcceleratorAssociationId?: string | undefined;
  ElasticInferenceAcceleratorAssociationState?: string | undefined;
  ElasticInferenceAcceleratorAssociationTime?: Date | undefined;
}
export interface HibernationOptions {
  Configured?: boolean | undefined;
}
export declare const InstanceLifecycleType: {
  readonly capacity_block: "capacity-block";
  readonly scheduled: "scheduled";
  readonly spot: "spot";
};
export type InstanceLifecycleType =
  (typeof InstanceLifecycleType)[keyof typeof InstanceLifecycleType];
export interface LicenseConfiguration {
  LicenseConfigurationArn?: string | undefined;
}
export declare const InstanceAutoRecoveryState: {
  readonly default: "default";
  readonly disabled: "disabled";
};
export type InstanceAutoRecoveryState =
  (typeof InstanceAutoRecoveryState)[keyof typeof InstanceAutoRecoveryState];
export interface InstanceMaintenanceOptions {
  AutoRecovery?: InstanceAutoRecoveryState | undefined;
}
export declare const InstanceMetadataEndpointState: {
  readonly disabled: "disabled";
  readonly enabled: "enabled";
};
export type InstanceMetadataEndpointState =
  (typeof InstanceMetadataEndpointState)[keyof typeof InstanceMetadataEndpointState];
export declare const InstanceMetadataProtocolState: {
  readonly disabled: "disabled";
  readonly enabled: "enabled";
};
export type InstanceMetadataProtocolState =
  (typeof InstanceMetadataProtocolState)[keyof typeof InstanceMetadataProtocolState];
export declare const HttpTokensState: {
  readonly optional: "optional";
  readonly required: "required";
};
export type HttpTokensState =
  (typeof HttpTokensState)[keyof typeof HttpTokensState];
export declare const InstanceMetadataTagsState: {
  readonly disabled: "disabled";
  readonly enabled: "enabled";
};
export type InstanceMetadataTagsState =
  (typeof InstanceMetadataTagsState)[keyof typeof InstanceMetadataTagsState];
export declare const InstanceMetadataOptionsState: {
  readonly applied: "applied";
  readonly pending: "pending";
};
export type InstanceMetadataOptionsState =
  (typeof InstanceMetadataOptionsState)[keyof typeof InstanceMetadataOptionsState];
export interface InstanceMetadataOptionsResponse {
  State?: InstanceMetadataOptionsState | undefined;
  HttpTokens?: HttpTokensState | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpEndpoint?: InstanceMetadataEndpointState | undefined;
  HttpProtocolIpv6?: InstanceMetadataProtocolState | undefined;
  InstanceMetadataTags?: InstanceMetadataTagsState | undefined;
}
export declare const MonitoringState: {
  readonly disabled: "disabled";
  readonly disabling: "disabling";
  readonly enabled: "enabled";
  readonly pending: "pending";
};
export type MonitoringState =
  (typeof MonitoringState)[keyof typeof MonitoringState];
export interface Monitoring {
  State?: MonitoringState | undefined;
}
export interface InstanceNetworkInterfaceAssociation {
  CarrierIp?: string | undefined;
  CustomerOwnedIp?: string | undefined;
  IpOwnerId?: string | undefined;
  PublicDnsName?: string | undefined;
  PublicIp?: string | undefined;
}
export interface InstanceAttachmentEnaSrdUdpSpecification {
  EnaSrdUdpEnabled?: boolean | undefined;
}
export interface InstanceAttachmentEnaSrdSpecification {
  EnaSrdEnabled?: boolean | undefined;
  EnaSrdUdpSpecification?: InstanceAttachmentEnaSrdUdpSpecification | undefined;
}
export interface InstanceNetworkInterfaceAttachment {
  AttachTime?: Date | undefined;
  AttachmentId?: string | undefined;
  DeleteOnTermination?: boolean | undefined;
  DeviceIndex?: number | undefined;
  Status?: AttachmentStatus | undefined;
  NetworkCardIndex?: number | undefined;
  EnaSrdSpecification?: InstanceAttachmentEnaSrdSpecification | undefined;
}
export interface ConnectionTrackingSpecificationResponse {
  TcpEstablishedTimeout?: number | undefined;
  UdpStreamTimeout?: number | undefined;
  UdpTimeout?: number | undefined;
}
export interface InstanceIpv4Prefix {
  Ipv4Prefix?: string | undefined;
}
export interface InstanceIpv6Prefix {
  Ipv6Prefix?: string | undefined;
}
export interface InstancePrivateIpAddress {
  Association?: InstanceNetworkInterfaceAssociation | undefined;
  Primary?: boolean | undefined;
  PrivateDnsName?: string | undefined;
  PrivateIpAddress?: string | undefined;
}
export interface InstanceNetworkInterface {
  Association?: InstanceNetworkInterfaceAssociation | undefined;
  Attachment?: InstanceNetworkInterfaceAttachment | undefined;
  Description?: string | undefined;
  Groups?: GroupIdentifier[] | undefined;
  Ipv6Addresses?: InstanceIpv6Address[] | undefined;
  MacAddress?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  OwnerId?: string | undefined;
  PrivateDnsName?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PrivateIpAddresses?: InstancePrivateIpAddress[] | undefined;
  SourceDestCheck?: boolean | undefined;
  Status?: NetworkInterfaceStatus | undefined;
  SubnetId?: string | undefined;
  VpcId?: string | undefined;
  InterfaceType?: string | undefined;
  Ipv4Prefixes?: InstanceIpv4Prefix[] | undefined;
  Ipv6Prefixes?: InstanceIpv6Prefix[] | undefined;
  ConnectionTrackingConfiguration?:
    | ConnectionTrackingSpecificationResponse
    | undefined;
  Operator?: OperatorResponse | undefined;
}
export interface PrivateDnsNameOptionsResponse {
  HostnameType?: HostnameType | undefined;
  EnableResourceNameDnsARecord?: boolean | undefined;
  EnableResourceNameDnsAAAARecord?: boolean | undefined;
}
export interface Instance {
  Architecture?: ArchitectureValues | undefined;
  BlockDeviceMappings?: InstanceBlockDeviceMapping[] | undefined;
  ClientToken?: string | undefined;
  EbsOptimized?: boolean | undefined;
  EnaSupport?: boolean | undefined;
  Hypervisor?: HypervisorType | undefined;
  IamInstanceProfile?: IamInstanceProfile | undefined;
  InstanceLifecycle?: InstanceLifecycleType | undefined;
  ElasticGpuAssociations?: ElasticGpuAssociation[] | undefined;
  ElasticInferenceAcceleratorAssociations?:
    | ElasticInferenceAcceleratorAssociation[]
    | undefined;
  NetworkInterfaces?: InstanceNetworkInterface[] | undefined;
  OutpostArn?: string | undefined;
  RootDeviceName?: string | undefined;
  RootDeviceType?: DeviceType | undefined;
  SecurityGroups?: GroupIdentifier[] | undefined;
  SourceDestCheck?: boolean | undefined;
  SpotInstanceRequestId?: string | undefined;
  SriovNetSupport?: string | undefined;
  StateReason?: StateReason | undefined;
  Tags?: Tag[] | undefined;
  VirtualizationType?: VirtualizationType | undefined;
  CpuOptions?: CpuOptions | undefined;
  CapacityReservationId?: string | undefined;
  CapacityReservationSpecification?:
    | CapacityReservationSpecificationResponse
    | undefined;
  HibernationOptions?: HibernationOptions | undefined;
  Licenses?: LicenseConfiguration[] | undefined;
  MetadataOptions?: InstanceMetadataOptionsResponse | undefined;
  EnclaveOptions?: EnclaveOptions | undefined;
  BootMode?: BootModeValues | undefined;
  PlatformDetails?: string | undefined;
  UsageOperation?: string | undefined;
  UsageOperationUpdateTime?: Date | undefined;
  PrivateDnsNameOptions?: PrivateDnsNameOptionsResponse | undefined;
  Ipv6Address?: string | undefined;
  TpmSupport?: string | undefined;
  MaintenanceOptions?: InstanceMaintenanceOptions | undefined;
  CurrentInstanceBootMode?: InstanceBootModeValues | undefined;
  Operator?: OperatorResponse | undefined;
  InstanceId?: string | undefined;
  ImageId?: string | undefined;
  State?: InstanceState | undefined;
  PrivateDnsName?: string | undefined;
  PublicDnsName?: string | undefined;
  StateTransitionReason?: string | undefined;
  KeyName?: string | undefined;
  AmiLaunchIndex?: number | undefined;
  ProductCodes?: ProductCode[] | undefined;
  InstanceType?: _InstanceType | undefined;
  LaunchTime?: Date | undefined;
  Placement?: Placement | undefined;
  KernelId?: string | undefined;
  RamdiskId?: string | undefined;
  Platform?: PlatformValues | undefined;
  Monitoring?: Monitoring | undefined;
  SubnetId?: string | undefined;
  VpcId?: string | undefined;
  PrivateIpAddress?: string | undefined;
  PublicIpAddress?: string | undefined;
}
export interface Reservation {
  ReservationId?: string | undefined;
  OwnerId?: string | undefined;
  RequesterId?: string | undefined;
  Groups?: GroupIdentifier[] | undefined;
  Instances?: Instance[] | undefined;
}
export interface DescribeInstancesResult {
  NextToken?: string | undefined;
  Reservations?: Reservation[] | undefined;
}
export interface DescribeInstanceStatusRequest {
  InstanceIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  IncludeAllInstances?: boolean | undefined;
}
export declare const StatusName: {
  readonly reachability: "reachability";
};
export type StatusName = (typeof StatusName)[keyof typeof StatusName];
export declare const StatusType: {
  readonly failed: "failed";
  readonly initializing: "initializing";
  readonly insufficient_data: "insufficient-data";
  readonly passed: "passed";
};
export type StatusType = (typeof StatusType)[keyof typeof StatusType];
export interface EbsStatusDetails {
  ImpairedSince?: Date | undefined;
  Name?: StatusName | undefined;
  Status?: StatusType | undefined;
}
export declare const SummaryStatus: {
  readonly impaired: "impaired";
  readonly initializing: "initializing";
  readonly insufficient_data: "insufficient-data";
  readonly not_applicable: "not-applicable";
  readonly ok: "ok";
};
export type SummaryStatus = (typeof SummaryStatus)[keyof typeof SummaryStatus];
export interface EbsStatusSummary {
  Details?: EbsStatusDetails[] | undefined;
  Status?: SummaryStatus | undefined;
}
export declare const EventCode: {
  readonly instance_reboot: "instance-reboot";
  readonly instance_retirement: "instance-retirement";
  readonly instance_stop: "instance-stop";
  readonly system_maintenance: "system-maintenance";
  readonly system_reboot: "system-reboot";
};
export type EventCode = (typeof EventCode)[keyof typeof EventCode];
export interface InstanceStatusEvent {
  InstanceEventId?: string | undefined;
  Code?: EventCode | undefined;
  Description?: string | undefined;
  NotAfter?: Date | undefined;
  NotBefore?: Date | undefined;
  NotBeforeDeadline?: Date | undefined;
}
export interface InstanceStatusDetails {
  ImpairedSince?: Date | undefined;
  Name?: StatusName | undefined;
  Status?: StatusType | undefined;
}
export interface InstanceStatusSummary {
  Details?: InstanceStatusDetails[] | undefined;
  Status?: SummaryStatus | undefined;
}
export interface InstanceStatus {
  AvailabilityZone?: string | undefined;
  OutpostArn?: string | undefined;
  Operator?: OperatorResponse | undefined;
  Events?: InstanceStatusEvent[] | undefined;
  InstanceId?: string | undefined;
  InstanceState?: InstanceState | undefined;
  InstanceStatus?: InstanceStatusSummary | undefined;
  SystemStatus?: InstanceStatusSummary | undefined;
  AttachedEbsStatus?: EbsStatusSummary | undefined;
}
export interface DescribeInstanceStatusResult {
  InstanceStatuses?: InstanceStatus[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceTopologyRequest {
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  InstanceIds?: string[] | undefined;
  GroupNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface InstanceTopology {
  InstanceId?: string | undefined;
  InstanceType?: string | undefined;
  GroupName?: string | undefined;
  NetworkNodes?: string[] | undefined;
  AvailabilityZone?: string | undefined;
  ZoneId?: string | undefined;
}
export interface DescribeInstanceTopologyResult {
  Instances?: InstanceTopology[] | undefined;
  NextToken?: string | undefined;
}
export declare const LocationType: {
  readonly availability_zone: "availability-zone";
  readonly availability_zone_id: "availability-zone-id";
  readonly outpost: "outpost";
  readonly region: "region";
};
export type LocationType = (typeof LocationType)[keyof typeof LocationType];
export interface DescribeInstanceTypeOfferingsRequest {
  DryRun?: boolean | undefined;
  LocationType?: LocationType | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface InstanceTypeOffering {
  InstanceType?: _InstanceType | undefined;
  LocationType?: LocationType | undefined;
  Location?: string | undefined;
}
export interface DescribeInstanceTypeOfferingsResult {
  InstanceTypeOfferings?: InstanceTypeOffering[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInstanceTypesRequest {
  DryRun?: boolean | undefined;
  InstanceTypes?: _InstanceType[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface EbsOptimizedInfo {
  BaselineBandwidthInMbps?: number | undefined;
  BaselineThroughputInMBps?: number | undefined;
  BaselineIops?: number | undefined;
  MaximumBandwidthInMbps?: number | undefined;
  MaximumThroughputInMBps?: number | undefined;
  MaximumIops?: number | undefined;
}
export declare const EbsOptimizedSupport: {
  readonly default: "default";
  readonly supported: "supported";
  readonly unsupported: "unsupported";
};
export type EbsOptimizedSupport =
  (typeof EbsOptimizedSupport)[keyof typeof EbsOptimizedSupport];
export declare const EbsEncryptionSupport: {
  readonly supported: "supported";
  readonly unsupported: "unsupported";
};
export type EbsEncryptionSupport =
  (typeof EbsEncryptionSupport)[keyof typeof EbsEncryptionSupport];
export declare const EbsNvmeSupport: {
  readonly REQUIRED: "required";
  readonly SUPPORTED: "supported";
  readonly UNSUPPORTED: "unsupported";
};
export type EbsNvmeSupport =
  (typeof EbsNvmeSupport)[keyof typeof EbsNvmeSupport];
export interface EbsInfo {
  EbsOptimizedSupport?: EbsOptimizedSupport | undefined;
  EncryptionSupport?: EbsEncryptionSupport | undefined;
  EbsOptimizedInfo?: EbsOptimizedInfo | undefined;
  NvmeSupport?: EbsNvmeSupport | undefined;
}
export interface FpgaDeviceMemoryInfo {
  SizeInMiB?: number | undefined;
}
export interface FpgaDeviceInfo {
  Name?: string | undefined;
  Manufacturer?: string | undefined;
  Count?: number | undefined;
  MemoryInfo?: FpgaDeviceMemoryInfo | undefined;
}
export interface FpgaInfo {
  Fpgas?: FpgaDeviceInfo[] | undefined;
  TotalFpgaMemoryInMiB?: number | undefined;
}
export interface GpuDeviceMemoryInfo {
  SizeInMiB?: number | undefined;
}
export interface GpuDeviceInfo {
  Name?: string | undefined;
  Manufacturer?: string | undefined;
  Count?: number | undefined;
  MemoryInfo?: GpuDeviceMemoryInfo | undefined;
}
export interface GpuInfo {
  Gpus?: GpuDeviceInfo[] | undefined;
  TotalGpuMemoryInMiB?: number | undefined;
}
export declare const InstanceTypeHypervisor: {
  readonly NITRO: "nitro";
  readonly XEN: "xen";
};
export type InstanceTypeHypervisor =
  (typeof InstanceTypeHypervisor)[keyof typeof InstanceTypeHypervisor];
export interface InferenceDeviceMemoryInfo {
  SizeInMiB?: number | undefined;
}
export interface InferenceDeviceInfo {
  Count?: number | undefined;
  Name?: string | undefined;
  Manufacturer?: string | undefined;
  MemoryInfo?: InferenceDeviceMemoryInfo | undefined;
}
export interface InferenceAcceleratorInfo {
  Accelerators?: InferenceDeviceInfo[] | undefined;
  TotalInferenceMemoryInMiB?: number | undefined;
}
export declare const DiskType: {
  readonly hdd: "hdd";
  readonly ssd: "ssd";
};
export type DiskType = (typeof DiskType)[keyof typeof DiskType];
export interface DiskInfo {
  SizeInGB?: number | undefined;
  Count?: number | undefined;
  Type?: DiskType | undefined;
}
export declare const InstanceStorageEncryptionSupport: {
  readonly required: "required";
  readonly unsupported: "unsupported";
};
export type InstanceStorageEncryptionSupport =
  (typeof InstanceStorageEncryptionSupport)[keyof typeof InstanceStorageEncryptionSupport];
export declare const EphemeralNvmeSupport: {
  readonly REQUIRED: "required";
  readonly SUPPORTED: "supported";
  readonly UNSUPPORTED: "unsupported";
};
export type EphemeralNvmeSupport =
  (typeof EphemeralNvmeSupport)[keyof typeof EphemeralNvmeSupport];
export interface InstanceStorageInfo {
  TotalSizeInGB?: number | undefined;
  Disks?: DiskInfo[] | undefined;
  NvmeSupport?: EphemeralNvmeSupport | undefined;
  EncryptionSupport?: InstanceStorageEncryptionSupport | undefined;
}
export interface MediaDeviceMemoryInfo {
  SizeInMiB?: number | undefined;
}
export interface MediaDeviceInfo {
  Count?: number | undefined;
  Name?: string | undefined;
  Manufacturer?: string | undefined;
  MemoryInfo?: MediaDeviceMemoryInfo | undefined;
}
export interface MediaAcceleratorInfo {
  Accelerators?: MediaDeviceInfo[] | undefined;
  TotalMediaMemoryInMiB?: number | undefined;
}
export interface MemoryInfo {
  SizeInMiB?: number | undefined;
}
export interface EfaInfo {
  MaximumEfaInterfaces?: number | undefined;
}
export declare const EnaSupport: {
  readonly required: "required";
  readonly supported: "supported";
  readonly unsupported: "unsupported";
};
export type EnaSupport = (typeof EnaSupport)[keyof typeof EnaSupport];
export interface NetworkCardInfo {
  NetworkCardIndex?: number | undefined;
  NetworkPerformance?: string | undefined;
  MaximumNetworkInterfaces?: number | undefined;
  BaselineBandwidthInGbps?: number | undefined;
  PeakBandwidthInGbps?: number | undefined;
}
export interface NetworkInfo {
  NetworkPerformance?: string | undefined;
  MaximumNetworkInterfaces?: number | undefined;
  MaximumNetworkCards?: number | undefined;
  DefaultNetworkCardIndex?: number | undefined;
  NetworkCards?: NetworkCardInfo[] | undefined;
  Ipv4AddressesPerInterface?: number | undefined;
  Ipv6AddressesPerInterface?: number | undefined;
  Ipv6Supported?: boolean | undefined;
  EnaSupport?: EnaSupport | undefined;
  EfaSupported?: boolean | undefined;
  EfaInfo?: EfaInfo | undefined;
  EncryptionInTransitSupported?: boolean | undefined;
  EnaSrdSupported?: boolean | undefined;
}
export interface NeuronDeviceCoreInfo {
  Count?: number | undefined;
  Version?: number | undefined;
}
export interface NeuronDeviceMemoryInfo {
  SizeInMiB?: number | undefined;
}
export interface NeuronDeviceInfo {
  Count?: number | undefined;
  Name?: string | undefined;
  CoreInfo?: NeuronDeviceCoreInfo | undefined;
  MemoryInfo?: NeuronDeviceMemoryInfo | undefined;
}
export interface NeuronInfo {
  NeuronDevices?: NeuronDeviceInfo[] | undefined;
  TotalNeuronDeviceMemoryInMiB?: number | undefined;
}
export declare const NitroEnclavesSupport: {
  readonly SUPPORTED: "supported";
  readonly UNSUPPORTED: "unsupported";
};
export type NitroEnclavesSupport =
  (typeof NitroEnclavesSupport)[keyof typeof NitroEnclavesSupport];
export interface NitroTpmInfo {
  SupportedVersions?: string[] | undefined;
}
export declare const NitroTpmSupport: {
  readonly SUPPORTED: "supported";
  readonly UNSUPPORTED: "unsupported";
};
export type NitroTpmSupport =
  (typeof NitroTpmSupport)[keyof typeof NitroTpmSupport];
export declare const PhcSupport: {
  readonly SUPPORTED: "supported";
  readonly UNSUPPORTED: "unsupported";
};
export type PhcSupport = (typeof PhcSupport)[keyof typeof PhcSupport];
export declare const PlacementGroupStrategy: {
  readonly cluster: "cluster";
  readonly partition: "partition";
  readonly spread: "spread";
};
export type PlacementGroupStrategy =
  (typeof PlacementGroupStrategy)[keyof typeof PlacementGroupStrategy];
export interface PlacementGroupInfo {
  SupportedStrategies?: PlacementGroupStrategy[] | undefined;
}
export declare const ArchitectureType: {
  readonly arm64: "arm64";
  readonly arm64_mac: "arm64_mac";
  readonly i386: "i386";
  readonly x86_64: "x86_64";
  readonly x86_64_mac: "x86_64_mac";
};
export type ArchitectureType =
  (typeof ArchitectureType)[keyof typeof ArchitectureType];
export declare const SupportedAdditionalProcessorFeature: {
  readonly AMD_SEV_SNP: "amd-sev-snp";
};
export type SupportedAdditionalProcessorFeature =
  (typeof SupportedAdditionalProcessorFeature)[keyof typeof SupportedAdditionalProcessorFeature];
export interface ProcessorInfo {
  SupportedArchitectures?: ArchitectureType[] | undefined;
  SustainedClockSpeedInGhz?: number | undefined;
  SupportedFeatures?: SupportedAdditionalProcessorFeature[] | undefined;
  Manufacturer?: string | undefined;
}
export declare const BootModeType: {
  readonly legacy_bios: "legacy-bios";
  readonly uefi: "uefi";
};
export type BootModeType = (typeof BootModeType)[keyof typeof BootModeType];
export declare const RootDeviceType: {
  readonly ebs: "ebs";
  readonly instance_store: "instance-store";
};
export type RootDeviceType =
  (typeof RootDeviceType)[keyof typeof RootDeviceType];
export declare const UsageClassType: {
  readonly capacity_block: "capacity-block";
  readonly on_demand: "on-demand";
  readonly spot: "spot";
};
export type UsageClassType =
  (typeof UsageClassType)[keyof typeof UsageClassType];
export interface VCpuInfo {
  DefaultVCpus?: number | undefined;
  DefaultCores?: number | undefined;
  DefaultThreadsPerCore?: number | undefined;
  ValidCores?: number[] | undefined;
  ValidThreadsPerCore?: number[] | undefined;
}
export interface InstanceTypeInfo {
  InstanceType?: _InstanceType | undefined;
  CurrentGeneration?: boolean | undefined;
  FreeTierEligible?: boolean | undefined;
  SupportedUsageClasses?: UsageClassType[] | undefined;
  SupportedRootDeviceTypes?: RootDeviceType[] | undefined;
  SupportedVirtualizationTypes?: VirtualizationType[] | undefined;
  BareMetal?: boolean | undefined;
  Hypervisor?: InstanceTypeHypervisor | undefined;
  ProcessorInfo?: ProcessorInfo | undefined;
  VCpuInfo?: VCpuInfo | undefined;
  MemoryInfo?: MemoryInfo | undefined;
  InstanceStorageSupported?: boolean | undefined;
  InstanceStorageInfo?: InstanceStorageInfo | undefined;
  EbsInfo?: EbsInfo | undefined;
  NetworkInfo?: NetworkInfo | undefined;
  GpuInfo?: GpuInfo | undefined;
  FpgaInfo?: FpgaInfo | undefined;
  PlacementGroupInfo?: PlacementGroupInfo | undefined;
  InferenceAcceleratorInfo?: InferenceAcceleratorInfo | undefined;
  HibernationSupported?: boolean | undefined;
  BurstablePerformanceSupported?: boolean | undefined;
  DedicatedHostsSupported?: boolean | undefined;
  AutoRecoverySupported?: boolean | undefined;
  SupportedBootModes?: BootModeType[] | undefined;
  NitroEnclavesSupport?: NitroEnclavesSupport | undefined;
  NitroTpmSupport?: NitroTpmSupport | undefined;
  NitroTpmInfo?: NitroTpmInfo | undefined;
  MediaAcceleratorInfo?: MediaAcceleratorInfo | undefined;
  NeuronInfo?: NeuronInfo | undefined;
  PhcSupport?: PhcSupport | undefined;
}
export interface DescribeInstanceTypesResult {
  InstanceTypes?: InstanceTypeInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeInternetGatewaysRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  InternetGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeInternetGatewaysResult {
  InternetGateways?: InternetGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIpamByoasnRequest {
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIpamByoasnResult {
  Byoasns?: Byoasn[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIpamExternalResourceVerificationTokensRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  IpamExternalResourceVerificationTokenIds?: string[] | undefined;
}
export interface DescribeIpamExternalResourceVerificationTokensResult {
  NextToken?: string | undefined;
  IpamExternalResourceVerificationTokens?:
    | IpamExternalResourceVerificationToken[]
    | undefined;
}
export interface DescribeIpamPoolsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  IpamPoolIds?: string[] | undefined;
}
export interface DescribeIpamPoolsResult {
  NextToken?: string | undefined;
  IpamPools?: IpamPool[] | undefined;
}
export interface DescribeIpamResourceDiscoveriesRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeIpamResourceDiscoveriesResult {
  IpamResourceDiscoveries?: IpamResourceDiscovery[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIpamResourceDiscoveryAssociationsRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryAssociationIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeIpamResourceDiscoveryAssociationsResult {
  IpamResourceDiscoveryAssociations?:
    | IpamResourceDiscoveryAssociation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeIpamsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  IpamIds?: string[] | undefined;
}
export interface DescribeIpamsResult {
  NextToken?: string | undefined;
  Ipams?: Ipam[] | undefined;
}
export interface DescribeIpamScopesRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  IpamScopeIds?: string[] | undefined;
}
export interface DescribeIpamScopesResult {
  NextToken?: string | undefined;
  IpamScopes?: IpamScope[] | undefined;
}
export interface DescribeIpv6PoolsRequest {
  PoolIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface PoolCidrBlock {
  Cidr?: string | undefined;
}
export interface Ipv6Pool {
  PoolId?: string | undefined;
  Description?: string | undefined;
  PoolCidrBlocks?: PoolCidrBlock[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeIpv6PoolsResult {
  Ipv6Pools?: Ipv6Pool[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeKeyPairsRequest {
  KeyNames?: string[] | undefined;
  KeyPairIds?: string[] | undefined;
  IncludePublicKey?: boolean | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface KeyPairInfo {
  KeyPairId?: string | undefined;
  KeyType?: KeyType | undefined;
  Tags?: Tag[] | undefined;
  PublicKey?: string | undefined;
  CreateTime?: Date | undefined;
  KeyName?: string | undefined;
  KeyFingerprint?: string | undefined;
}
export interface DescribeKeyPairsResult {
  KeyPairs?: KeyPairInfo[] | undefined;
}
export interface DescribeLaunchTemplatesRequest {
  DryRun?: boolean | undefined;
  LaunchTemplateIds?: string[] | undefined;
  LaunchTemplateNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeLaunchTemplatesResult {
  LaunchTemplates?: LaunchTemplate[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLaunchTemplateVersionsRequest {
  DryRun?: boolean | undefined;
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Versions?: string[] | undefined;
  MinVersion?: string | undefined;
  MaxVersion?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  ResolveAlias?: boolean | undefined;
}
export interface DescribeLaunchTemplateVersionsResult {
  LaunchTemplateVersions?: LaunchTemplateVersion[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayRouteTablesRequest {
  LocalGatewayRouteTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayRouteTablesResult {
  LocalGatewayRouteTables?: LocalGatewayRouteTable[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsRequest {
  LocalGatewayRouteTableVirtualInterfaceGroupAssociationIds?:
    | string[]
    | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayRouteTableVirtualInterfaceGroupAssociationsResult {
  LocalGatewayRouteTableVirtualInterfaceGroupAssociations?:
    | LocalGatewayRouteTableVirtualInterfaceGroupAssociation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayRouteTableVpcAssociationsRequest {
  LocalGatewayRouteTableVpcAssociationIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeLocalGatewayRouteTableVpcAssociationsResult {
  LocalGatewayRouteTableVpcAssociations?:
    | LocalGatewayRouteTableVpcAssociation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewaysRequest {
  LocalGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface LocalGateway {
  LocalGatewayId?: string | undefined;
  OutpostArn?: string | undefined;
  OwnerId?: string | undefined;
  State?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeLocalGatewaysResult {
  LocalGateways?: LocalGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayVirtualInterfaceGroupsRequest {
  LocalGatewayVirtualInterfaceGroupIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface LocalGatewayVirtualInterfaceGroup {
  LocalGatewayVirtualInterfaceGroupId?: string | undefined;
  LocalGatewayVirtualInterfaceIds?: string[] | undefined;
  LocalGatewayId?: string | undefined;
  OwnerId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeLocalGatewayVirtualInterfaceGroupsResult {
  LocalGatewayVirtualInterfaceGroups?:
    | LocalGatewayVirtualInterfaceGroup[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLocalGatewayVirtualInterfacesRequest {
  LocalGatewayVirtualInterfaceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface LocalGatewayVirtualInterface {
  LocalGatewayVirtualInterfaceId?: string | undefined;
  LocalGatewayId?: string | undefined;
  Vlan?: number | undefined;
  LocalAddress?: string | undefined;
  PeerAddress?: string | undefined;
  LocalBgpAsn?: number | undefined;
  PeerBgpAsn?: number | undefined;
  OwnerId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeLocalGatewayVirtualInterfacesResult {
  LocalGatewayVirtualInterfaces?: LocalGatewayVirtualInterface[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeLockedSnapshotsRequest {
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  SnapshotIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const LockState: {
  readonly compliance: "compliance";
  readonly compliance_cooloff: "compliance-cooloff";
  readonly expired: "expired";
  readonly governance: "governance";
};
export type LockState = (typeof LockState)[keyof typeof LockState];
export interface LockedSnapshotsInfo {
  OwnerId?: string | undefined;
  SnapshotId?: string | undefined;
  LockState?: LockState | undefined;
  LockDuration?: number | undefined;
  CoolOffPeriod?: number | undefined;
  CoolOffPeriodExpiresOn?: Date | undefined;
  LockCreatedOn?: Date | undefined;
  LockDurationStartTime?: Date | undefined;
  LockExpiresOn?: Date | undefined;
}
export interface DescribeLockedSnapshotsResult {
  Snapshots?: LockedSnapshotsInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeMacHostsRequest {
  Filters?: Filter[] | undefined;
  HostIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface MacHost {
  HostId?: string | undefined;
  MacOSLatestSupportedVersions?: string[] | undefined;
}
export interface DescribeMacHostsResult {
  MacHosts?: MacHost[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeManagedPrefixListsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  PrefixListIds?: string[] | undefined;
}
export interface DescribeManagedPrefixListsResult {
  NextToken?: string | undefined;
  PrefixLists?: ManagedPrefixList[] | undefined;
}
export interface DescribeMovingAddressesRequest {
  DryRun?: boolean | undefined;
  PublicIps?: string[] | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
}
export declare const MoveStatus: {
  readonly movingToVpc: "movingToVpc";
  readonly restoringToClassic: "restoringToClassic";
};
export type MoveStatus = (typeof MoveStatus)[keyof typeof MoveStatus];
export interface MovingAddressStatus {
  MoveStatus?: MoveStatus | undefined;
  PublicIp?: string | undefined;
}
export interface DescribeMovingAddressesResult {
  MovingAddressStatuses?: MovingAddressStatus[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNatGatewaysRequest {
  DryRun?: boolean | undefined;
  Filter?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NatGatewayIds?: string[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNatGatewaysResult {
  NatGateways?: NatGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkAclsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NetworkAclIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeNetworkAclsResult {
  NetworkAcls?: NetworkAcl[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAccessScopeAnalysesRequest {
  NetworkInsightsAccessScopeAnalysisIds?: string[] | undefined;
  NetworkInsightsAccessScopeId?: string | undefined;
  AnalysisStartTimeBegin?: Date | undefined;
  AnalysisStartTimeEnd?: Date | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export declare const FindingsFound: {
  readonly false: "false";
  readonly true: "true";
  readonly unknown: "unknown";
};
export type FindingsFound = (typeof FindingsFound)[keyof typeof FindingsFound];
export declare const AnalysisStatus: {
  readonly failed: "failed";
  readonly running: "running";
  readonly succeeded: "succeeded";
};
export type AnalysisStatus =
  (typeof AnalysisStatus)[keyof typeof AnalysisStatus];
export interface NetworkInsightsAccessScopeAnalysis {
  NetworkInsightsAccessScopeAnalysisId?: string | undefined;
  NetworkInsightsAccessScopeAnalysisArn?: string | undefined;
  NetworkInsightsAccessScopeId?: string | undefined;
  Status?: AnalysisStatus | undefined;
  StatusMessage?: string | undefined;
  WarningMessage?: string | undefined;
  StartDate?: Date | undefined;
  EndDate?: Date | undefined;
  FindingsFound?: FindingsFound | undefined;
  AnalyzedEniCount?: number | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeNetworkInsightsAccessScopeAnalysesResult {
  NetworkInsightsAccessScopeAnalyses?:
    | NetworkInsightsAccessScopeAnalysis[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAccessScopesRequest {
  NetworkInsightsAccessScopeIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAccessScopesResult {
  NetworkInsightsAccessScopes?: NetworkInsightsAccessScope[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsAnalysesRequest {
  NetworkInsightsAnalysisIds?: string[] | undefined;
  NetworkInsightsPathId?: string | undefined;
  AnalysisStartTime?: Date | undefined;
  AnalysisEndTime?: Date | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export interface NetworkInsightsAnalysis {
  NetworkInsightsAnalysisId?: string | undefined;
  NetworkInsightsAnalysisArn?: string | undefined;
  NetworkInsightsPathId?: string | undefined;
  AdditionalAccounts?: string[] | undefined;
  FilterInArns?: string[] | undefined;
  StartDate?: Date | undefined;
  Status?: AnalysisStatus | undefined;
  StatusMessage?: string | undefined;
  WarningMessage?: string | undefined;
  NetworkPathFound?: boolean | undefined;
  ForwardPathComponents?: PathComponent[] | undefined;
  ReturnPathComponents?: PathComponent[] | undefined;
  Explanations?: Explanation[] | undefined;
  AlternatePathHints?: AlternatePathHint[] | undefined;
  SuggestedAccounts?: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeNetworkInsightsAnalysesResult {
  NetworkInsightsAnalyses?: NetworkInsightsAnalysis[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsPathsRequest {
  NetworkInsightsPathIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInsightsPathsResult {
  NetworkInsightsPaths?: NetworkInsightsPath[] | undefined;
  NextToken?: string | undefined;
}
export declare const NetworkInterfaceAttribute: {
  readonly associatePublicIpAddress: "associatePublicIpAddress";
  readonly attachment: "attachment";
  readonly description: "description";
  readonly groupSet: "groupSet";
  readonly sourceDestCheck: "sourceDestCheck";
};
export type NetworkInterfaceAttribute =
  (typeof NetworkInterfaceAttribute)[keyof typeof NetworkInterfaceAttribute];
export interface DescribeNetworkInterfaceAttributeRequest {
  DryRun?: boolean | undefined;
  NetworkInterfaceId: string | undefined;
  Attribute?: NetworkInterfaceAttribute | undefined;
}
export interface DescribeNetworkInterfaceAttributeResult {
  Attachment?: NetworkInterfaceAttachment | undefined;
  Description?: AttributeValue | undefined;
  Groups?: GroupIdentifier[] | undefined;
  NetworkInterfaceId?: string | undefined;
  SourceDestCheck?: AttributeBooleanValue | undefined;
  AssociatePublicIpAddress?: boolean | undefined;
}
export interface DescribeNetworkInterfacePermissionsRequest {
  NetworkInterfacePermissionIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface DescribeNetworkInterfacePermissionsResult {
  NetworkInterfacePermissions?: NetworkInterfacePermission[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeNetworkInterfacesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeNetworkInterfacesResult {
  NetworkInterfaces?: NetworkInterface[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePlacementGroupsRequest {
  GroupIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  GroupNames?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribePlacementGroupsResult {
  PlacementGroups?: PlacementGroup[] | undefined;
}
export interface DescribePrefixListsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  PrefixListIds?: string[] | undefined;
}
export interface PrefixList {
  Cidrs?: string[] | undefined;
  PrefixListId?: string | undefined;
  PrefixListName?: string | undefined;
}
export interface DescribePrefixListsResult {
  NextToken?: string | undefined;
  PrefixLists?: PrefixList[] | undefined;
}
export interface DescribePrincipalIdFormatRequest {
  DryRun?: boolean | undefined;
  Resources?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface PrincipalIdFormat {
  Arn?: string | undefined;
  Statuses?: IdFormat[] | undefined;
}
export interface DescribePrincipalIdFormatResult {
  Principals?: PrincipalIdFormat[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribePublicIpv4PoolsRequest {
  PoolIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
}
export interface PublicIpv4PoolRange {
  FirstAddress?: string | undefined;
  LastAddress?: string | undefined;
  AddressCount?: number | undefined;
  AvailableAddressCount?: number | undefined;
}
export interface PublicIpv4Pool {
  PoolId?: string | undefined;
  Description?: string | undefined;
  PoolAddressRanges?: PublicIpv4PoolRange[] | undefined;
  TotalAddressCount?: number | undefined;
  TotalAvailableAddressCount?: number | undefined;
  NetworkBorderGroup?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribePublicIpv4PoolsResult {
  PublicIpv4Pools?: PublicIpv4Pool[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeRegionsRequest {
  RegionNames?: string[] | undefined;
  AllRegions?: boolean | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface Region {
  OptInStatus?: string | undefined;
  RegionName?: string | undefined;
  Endpoint?: string | undefined;
}
export interface DescribeRegionsResult {
  Regions?: Region[] | undefined;
}
export interface DescribeReplaceRootVolumeTasksRequest {
  ReplaceRootVolumeTaskIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeReplaceRootVolumeTasksResult {
  ReplaceRootVolumeTasks?: ReplaceRootVolumeTask[] | undefined;
  NextToken?: string | undefined;
}
export declare const OfferingClassType: {
  readonly CONVERTIBLE: "convertible";
  readonly STANDARD: "standard";
};
export type OfferingClassType =
  (typeof OfferingClassType)[keyof typeof OfferingClassType];
export declare const OfferingTypeValues: {
  readonly All_Upfront: "All Upfront";
  readonly Heavy_Utilization: "Heavy Utilization";
  readonly Light_Utilization: "Light Utilization";
  readonly Medium_Utilization: "Medium Utilization";
  readonly No_Upfront: "No Upfront";
  readonly Partial_Upfront: "Partial Upfront";
};
export type OfferingTypeValues =
  (typeof OfferingTypeValues)[keyof typeof OfferingTypeValues];
export interface DescribeReservedInstancesRequest {
  OfferingClass?: OfferingClassType | undefined;
  ReservedInstancesIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  OfferingType?: OfferingTypeValues | undefined;
}
export declare const RIProductDescription: {
  readonly Linux_UNIX: "Linux/UNIX";
  readonly Linux_UNIX_Amazon_VPC_: "Linux/UNIX (Amazon VPC)";
  readonly Windows: "Windows";
  readonly Windows_Amazon_VPC_: "Windows (Amazon VPC)";
};
export type RIProductDescription =
  (typeof RIProductDescription)[keyof typeof RIProductDescription];
export declare const RecurringChargeFrequency: {
  readonly Hourly: "Hourly";
};
export type RecurringChargeFrequency =
  (typeof RecurringChargeFrequency)[keyof typeof RecurringChargeFrequency];
export interface RecurringCharge {
  Amount?: number | undefined;
  Frequency?: RecurringChargeFrequency | undefined;
}
export declare const Scope: {
  readonly AVAILABILITY_ZONE: "Availability Zone";
  readonly REGIONAL: "Region";
};
export type Scope = (typeof Scope)[keyof typeof Scope];
export declare const ReservedInstanceState: {
  readonly active: "active";
  readonly payment_failed: "payment-failed";
  readonly payment_pending: "payment-pending";
  readonly queued: "queued";
  readonly queued_deleted: "queued-deleted";
  readonly retired: "retired";
};
export type ReservedInstanceState =
  (typeof ReservedInstanceState)[keyof typeof ReservedInstanceState];
export interface ReservedInstances {
  CurrencyCode?: CurrencyCodeValues | undefined;
  InstanceTenancy?: Tenancy | undefined;
  OfferingClass?: OfferingClassType | undefined;
  OfferingType?: OfferingTypeValues | undefined;
  RecurringCharges?: RecurringCharge[] | undefined;
  Scope?: Scope | undefined;
  Tags?: Tag[] | undefined;
  ReservedInstancesId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  AvailabilityZone?: string | undefined;
  Start?: Date | undefined;
  End?: Date | undefined;
  Duration?: number | undefined;
  UsagePrice?: number | undefined;
  FixedPrice?: number | undefined;
  InstanceCount?: number | undefined;
  ProductDescription?: RIProductDescription | undefined;
  State?: ReservedInstanceState | undefined;
}
export interface DescribeReservedInstancesResult {
  ReservedInstances?: ReservedInstances[] | undefined;
}
export interface DescribeReservedInstancesListingsRequest {
  ReservedInstancesId?: string | undefined;
  ReservedInstancesListingId?: string | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeReservedInstancesListingsResult {
  ReservedInstancesListings?: ReservedInstancesListing[] | undefined;
}
export interface DescribeReservedInstancesModificationsRequest {
  ReservedInstancesModificationIds?: string[] | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
}
export interface ReservedInstancesConfiguration {
  AvailabilityZone?: string | undefined;
  InstanceCount?: number | undefined;
  InstanceType?: _InstanceType | undefined;
  Platform?: string | undefined;
  Scope?: Scope | undefined;
}
export interface ReservedInstancesModificationResult {
  ReservedInstancesId?: string | undefined;
  TargetConfiguration?: ReservedInstancesConfiguration | undefined;
}
export interface ReservedInstancesId {
  ReservedInstancesId?: string | undefined;
}
export interface ReservedInstancesModification {
  ClientToken?: string | undefined;
  CreateDate?: Date | undefined;
  EffectiveDate?: Date | undefined;
  ModificationResults?: ReservedInstancesModificationResult[] | undefined;
  ReservedInstancesIds?: ReservedInstancesId[] | undefined;
  ReservedInstancesModificationId?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  UpdateDate?: Date | undefined;
}
export interface DescribeReservedInstancesModificationsResult {
  NextToken?: string | undefined;
  ReservedInstancesModifications?: ReservedInstancesModification[] | undefined;
}
export interface DescribeReservedInstancesOfferingsRequest {
  AvailabilityZone?: string | undefined;
  IncludeMarketplace?: boolean | undefined;
  InstanceType?: _InstanceType | undefined;
  MaxDuration?: number | undefined;
  MaxInstanceCount?: number | undefined;
  MinDuration?: number | undefined;
  OfferingClass?: OfferingClassType | undefined;
  ProductDescription?: RIProductDescription | undefined;
  ReservedInstancesOfferingIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  InstanceTenancy?: Tenancy | undefined;
  OfferingType?: OfferingTypeValues | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface PricingDetail {
  Count?: number | undefined;
  Price?: number | undefined;
}
export interface ReservedInstancesOffering {
  CurrencyCode?: CurrencyCodeValues | undefined;
  InstanceTenancy?: Tenancy | undefined;
  Marketplace?: boolean | undefined;
  OfferingClass?: OfferingClassType | undefined;
  OfferingType?: OfferingTypeValues | undefined;
  PricingDetails?: PricingDetail[] | undefined;
  RecurringCharges?: RecurringCharge[] | undefined;
  Scope?: Scope | undefined;
  ReservedInstancesOfferingId?: string | undefined;
  InstanceType?: _InstanceType | undefined;
  AvailabilityZone?: string | undefined;
  Duration?: number | undefined;
  UsagePrice?: number | undefined;
  FixedPrice?: number | undefined;
  ProductDescription?: RIProductDescription | undefined;
}
export interface DescribeReservedInstancesOfferingsResult {
  NextToken?: string | undefined;
  ReservedInstancesOfferings?: ReservedInstancesOffering[] | undefined;
}
export interface DescribeRouteTablesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  RouteTableIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeRouteTablesResult {
  RouteTables?: RouteTable[] | undefined;
  NextToken?: string | undefined;
}
export interface SlotDateTimeRangeRequest {
  EarliestTime: Date | undefined;
  LatestTime: Date | undefined;
}
export interface ScheduledInstanceRecurrenceRequest {
  Frequency?: string | undefined;
  Interval?: number | undefined;
  OccurrenceDays?: number[] | undefined;
  OccurrenceRelativeToEnd?: boolean | undefined;
  OccurrenceUnit?: string | undefined;
}
export interface DescribeScheduledInstanceAvailabilityRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  FirstSlotStartTimeRange: SlotDateTimeRangeRequest | undefined;
  MaxResults?: number | undefined;
  MaxSlotDurationInHours?: number | undefined;
  MinSlotDurationInHours?: number | undefined;
  NextToken?: string | undefined;
  Recurrence: ScheduledInstanceRecurrenceRequest | undefined;
}
export interface ScheduledInstanceRecurrence {
  Frequency?: string | undefined;
  Interval?: number | undefined;
  OccurrenceDaySet?: number[] | undefined;
  OccurrenceRelativeToEnd?: boolean | undefined;
  OccurrenceUnit?: string | undefined;
}
export declare const SnapshotDetailFilterSensitiveLog: (
  obj: SnapshotDetail
) => any;
export declare const ImportImageTaskFilterSensitiveLog: (
  obj: ImportImageTask
) => any;
export declare const DescribeImportImageTasksResultFilterSensitiveLog: (
  obj: DescribeImportImageTasksResult
) => any;
export declare const SnapshotTaskDetailFilterSensitiveLog: (
  obj: SnapshotTaskDetail
) => any;
export declare const ImportSnapshotTaskFilterSensitiveLog: (
  obj: ImportSnapshotTask
) => any;
export declare const DescribeImportSnapshotTasksResultFilterSensitiveLog: (
  obj: DescribeImportSnapshotTasksResult
) => any;
export declare const DescribeLaunchTemplateVersionsResultFilterSensitiveLog: (
  obj: DescribeLaunchTemplateVersionsResult
) => any;
