import {
  AccessScopeAnalysisFinding,
  AddIpamOperatingRegion,
  AddIpamOrganizationalUnitExclusion,
  AddPrefixListEntry,
  AddressAttribute,
  Affinity,
  AutoPlacement,
  CurrencyCodeValues,
  EnaSrdSpecification,
  EndDateType,
  HostMaintenance,
  HostRecovery,
  InstanceEventWindow,
  InstanceMatchCriteria,
  IpamPoolAllocation,
  SubnetAssociation,
  Tag,
  TagSpecification,
  TargetConfigurationRequest,
  TransitGatewayAssociationState,
  TransitGatewayAttachmentResourceType,
  TransitGatewayPolicyTableAssociation,
  UnsuccessfulItem,
} from "./models_0";
import {
  _InstanceType,
  AttributeValue,
  CapacityReservationPreference,
  CapacityReservationState,
  CapacityReservationTarget,
  ClientConnectOptions,
  ClientLoginBannerOptions,
  ConnectionLogOptions,
  ConnectionTrackingSpecificationRequest,
  DiskImageFormat,
  FleetExcessCapacityTerminationPolicy,
  FleetLaunchTemplateConfigRequest,
  HostnameType,
  InstanceEventWindowTimeRangeRequest,
  InstanceRequirementsRequest,
  Ipam,
  IpamPool,
  IpamResourceDiscovery,
  IpamResourceTag,
  IpamScope,
  IpamTier,
  LaunchTemplate,
  LocalGatewayRoute,
  ManagedPrefixList,
  Placement,
  PlatformValues,
  RequestIpamResourceTag,
  ResponseLaunchTemplateData,
  SelfServicePortal,
  ShutdownBehavior,
  TargetCapacitySpecificationRequest,
  TargetCapacityUnitType,
} from "./models_1";
import {
  NetworkInsightsAccessScopeContent,
  SSEType,
  SubnetCidrReservation,
  TransitGatewayPrefixListReference,
} from "./models_2";
import {
  ConversionTask,
  ExportTaskS3Location,
  Filter,
  FpgaImageAttributeName,
  IpamPoolCidr,
  MetricType,
  PeriodType,
  PermissionGroup,
  StatisticType,
} from "./models_3";
import {
  AnalysisStatus,
  ArchitectureType,
  ArchitectureValues,
  AttributeBooleanValue,
  BootModeValues,
  FpgaImageAttribute,
  HttpTokensState,
  ImportImageLicenseConfigurationResponse,
  InstanceAttributeName,
  InstanceAutoRecoveryState,
  InstanceMetadataEndpointState,
  InstanceMetadataOptionsResponse,
  InstanceMetadataProtocolState,
  InstanceMetadataTagsState,
  InstanceStatusEvent,
  LaunchPermission,
  LockState,
  PaymentOption,
  ReservedInstancesConfiguration,
  SnapshotDetail,
  SnapshotTaskDetail,
  VirtualizationType,
} from "./models_4";
import {
  CreateVolumePermission,
  ExcessCapacityTerminationPolicy,
  LaunchTemplateConfig,
  SnapshotAttributeName,
  SnapshotBlockPublicAccessState,
  TransitGatewayPropagationState,
} from "./models_5";
export interface EnableVgwRoutePropagationRequest {
  GatewayId: string | undefined;
  RouteTableId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface EnableVolumeIORequest {
  DryRun?: boolean | undefined;
  VolumeId: string | undefined;
}
export interface EnableVpcClassicLinkRequest {
  DryRun?: boolean | undefined;
  VpcId: string | undefined;
}
export interface EnableVpcClassicLinkResult {
  Return?: boolean | undefined;
}
export interface EnableVpcClassicLinkDnsSupportRequest {
  VpcId?: string | undefined;
}
export interface EnableVpcClassicLinkDnsSupportResult {
  Return?: boolean | undefined;
}
export interface ExportClientVpnClientCertificateRevocationListRequest {
  ClientVpnEndpointId: string | undefined;
  DryRun?: boolean | undefined;
}
export declare const ClientCertificateRevocationListStatusCode: {
  readonly active: "active";
  readonly pending: "pending";
};
export type ClientCertificateRevocationListStatusCode =
  (typeof ClientCertificateRevocationListStatusCode)[keyof typeof ClientCertificateRevocationListStatusCode];
export interface ClientCertificateRevocationListStatus {
  Code?: ClientCertificateRevocationListStatusCode | undefined;
  Message?: string | undefined;
}
export interface ExportClientVpnClientCertificateRevocationListResult {
  CertificateRevocationList?: string | undefined;
  Status?: ClientCertificateRevocationListStatus | undefined;
}
export interface ExportClientVpnClientConfigurationRequest {
  ClientVpnEndpointId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ExportClientVpnClientConfigurationResult {
  ClientConfiguration?: string | undefined;
}
export interface ExportTaskS3LocationRequest {
  S3Bucket: string | undefined;
  S3Prefix?: string | undefined;
}
export interface ExportImageRequest {
  ClientToken?: string | undefined;
  Description?: string | undefined;
  DiskImageFormat: DiskImageFormat | undefined;
  DryRun?: boolean | undefined;
  ImageId: string | undefined;
  S3ExportLocation: ExportTaskS3LocationRequest | undefined;
  RoleName?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface ExportImageResult {
  Description?: string | undefined;
  DiskImageFormat?: DiskImageFormat | undefined;
  ExportImageTaskId?: string | undefined;
  ImageId?: string | undefined;
  RoleName?: string | undefined;
  Progress?: string | undefined;
  S3ExportLocation?: ExportTaskS3Location | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ExportTransitGatewayRoutesRequest {
  TransitGatewayRouteTableId: string | undefined;
  Filters?: Filter[] | undefined;
  S3Bucket: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ExportTransitGatewayRoutesResult {
  S3Location?: string | undefined;
}
export interface GetAssociatedEnclaveCertificateIamRolesRequest {
  CertificateArn: string | undefined;
  DryRun?: boolean | undefined;
}
export interface AssociatedRole {
  AssociatedRoleArn?: string | undefined;
  CertificateS3BucketName?: string | undefined;
  CertificateS3ObjectKey?: string | undefined;
  EncryptionKmsKeyId?: string | undefined;
}
export interface GetAssociatedEnclaveCertificateIamRolesResult {
  AssociatedRoles?: AssociatedRole[] | undefined;
}
export interface GetAssociatedIpv6PoolCidrsRequest {
  PoolId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface Ipv6CidrAssociation {
  Ipv6Cidr?: string | undefined;
  AssociatedResource?: string | undefined;
}
export interface GetAssociatedIpv6PoolCidrsResult {
  Ipv6CidrAssociations?: Ipv6CidrAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface DataQuery {
  Id?: string | undefined;
  Source?: string | undefined;
  Destination?: string | undefined;
  Metric?: MetricType | undefined;
  Statistic?: StatisticType | undefined;
  Period?: PeriodType | undefined;
}
export interface GetAwsNetworkPerformanceDataRequest {
  DataQueries?: DataQuery[] | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface MetricPoint {
  StartDate?: Date | undefined;
  EndDate?: Date | undefined;
  Value?: number | undefined;
  Status?: string | undefined;
}
export interface DataResponse {
  Id?: string | undefined;
  Source?: string | undefined;
  Destination?: string | undefined;
  Metric?: MetricType | undefined;
  Statistic?: StatisticType | undefined;
  Period?: PeriodType | undefined;
  MetricPoints?: MetricPoint[] | undefined;
}
export interface GetAwsNetworkPerformanceDataResult {
  DataResponses?: DataResponse[] | undefined;
  NextToken?: string | undefined;
}
export interface GetCapacityReservationUsageRequest {
  CapacityReservationId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface InstanceUsage {
  AccountId?: string | undefined;
  UsedInstanceCount?: number | undefined;
}
export interface GetCapacityReservationUsageResult {
  NextToken?: string | undefined;
  CapacityReservationId?: string | undefined;
  InstanceType?: string | undefined;
  TotalInstanceCount?: number | undefined;
  AvailableInstanceCount?: number | undefined;
  State?: CapacityReservationState | undefined;
  InstanceUsages?: InstanceUsage[] | undefined;
}
export interface GetCoipPoolUsageRequest {
  PoolId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface CoipAddressUsage {
  AllocationId?: string | undefined;
  AwsAccountId?: string | undefined;
  AwsService?: string | undefined;
  CoIp?: string | undefined;
}
export interface GetCoipPoolUsageResult {
  CoipPoolId?: string | undefined;
  CoipAddressUsages?: CoipAddressUsage[] | undefined;
  LocalGatewayRouteTableId?: string | undefined;
  NextToken?: string | undefined;
}
export interface GetConsoleOutputRequest {
  InstanceId: string | undefined;
  Latest?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface GetConsoleOutputResult {
  InstanceId?: string | undefined;
  Timestamp?: Date | undefined;
  Output?: string | undefined;
}
export interface GetConsoleScreenshotRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  WakeUp?: boolean | undefined;
}
export interface GetConsoleScreenshotResult {
  ImageData?: string | undefined;
  InstanceId?: string | undefined;
}
export declare const UnlimitedSupportedInstanceFamily: {
  readonly t2: "t2";
  readonly t3: "t3";
  readonly t3a: "t3a";
  readonly t4g: "t4g";
};
export type UnlimitedSupportedInstanceFamily =
  (typeof UnlimitedSupportedInstanceFamily)[keyof typeof UnlimitedSupportedInstanceFamily];
export interface GetDefaultCreditSpecificationRequest {
  DryRun?: boolean | undefined;
  InstanceFamily: UnlimitedSupportedInstanceFamily | undefined;
}
export interface InstanceFamilyCreditSpecification {
  InstanceFamily?: UnlimitedSupportedInstanceFamily | undefined;
  CpuCredits?: string | undefined;
}
export interface GetDefaultCreditSpecificationResult {
  InstanceFamilyCreditSpecification?:
    | InstanceFamilyCreditSpecification
    | undefined;
}
export interface GetEbsDefaultKmsKeyIdRequest {
  DryRun?: boolean | undefined;
}
export interface GetEbsDefaultKmsKeyIdResult {
  KmsKeyId?: string | undefined;
}
export interface GetEbsEncryptionByDefaultRequest {
  DryRun?: boolean | undefined;
}
export interface GetEbsEncryptionByDefaultResult {
  EbsEncryptionByDefault?: boolean | undefined;
  SseType?: SSEType | undefined;
}
export declare const PartitionLoadFrequency: {
  readonly DAILY: "daily";
  readonly MONTHLY: "monthly";
  readonly NONE: "none";
  readonly WEEKLY: "weekly";
};
export type PartitionLoadFrequency =
  (typeof PartitionLoadFrequency)[keyof typeof PartitionLoadFrequency];
export interface AthenaIntegration {
  IntegrationResultS3DestinationArn: string | undefined;
  PartitionLoadFrequency: PartitionLoadFrequency | undefined;
  PartitionStartDate?: Date | undefined;
  PartitionEndDate?: Date | undefined;
}
export interface IntegrateServices {
  AthenaIntegrations?: AthenaIntegration[] | undefined;
}
export interface GetFlowLogsIntegrationTemplateRequest {
  DryRun?: boolean | undefined;
  FlowLogId: string | undefined;
  ConfigDeliveryS3DestinationArn: string | undefined;
  IntegrateServices: IntegrateServices | undefined;
}
export interface GetFlowLogsIntegrationTemplateResult {
  Result?: string | undefined;
}
export interface GetGroupsForCapacityReservationRequest {
  CapacityReservationId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface CapacityReservationGroup {
  GroupArn?: string | undefined;
  OwnerId?: string | undefined;
}
export interface GetGroupsForCapacityReservationResult {
  NextToken?: string | undefined;
  CapacityReservationGroups?: CapacityReservationGroup[] | undefined;
}
export interface GetHostReservationPurchasePreviewRequest {
  HostIdSet: string[] | undefined;
  OfferingId: string | undefined;
}
export interface Purchase {
  CurrencyCode?: CurrencyCodeValues | undefined;
  Duration?: number | undefined;
  HostIdSet?: string[] | undefined;
  HostReservationId?: string | undefined;
  HourlyPrice?: string | undefined;
  InstanceFamily?: string | undefined;
  PaymentOption?: PaymentOption | undefined;
  UpfrontPrice?: string | undefined;
}
export interface GetHostReservationPurchasePreviewResult {
  CurrencyCode?: CurrencyCodeValues | undefined;
  Purchase?: Purchase[] | undefined;
  TotalHourlyPrice?: string | undefined;
  TotalUpfrontPrice?: string | undefined;
}
export interface GetImageBlockPublicAccessStateRequest {
  DryRun?: boolean | undefined;
}
export interface GetImageBlockPublicAccessStateResult {
  ImageBlockPublicAccessState?: string | undefined;
}
export interface GetInstanceMetadataDefaultsRequest {
  DryRun?: boolean | undefined;
}
export interface InstanceMetadataDefaultsResponse {
  HttpTokens?: HttpTokensState | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpEndpoint?: InstanceMetadataEndpointState | undefined;
  InstanceMetadataTags?: InstanceMetadataTagsState | undefined;
}
export interface GetInstanceMetadataDefaultsResult {
  AccountLevel?: InstanceMetadataDefaultsResponse | undefined;
}
export declare const EkPubKeyFormat: {
  readonly der: "der";
  readonly tpmt: "tpmt";
};
export type EkPubKeyFormat =
  (typeof EkPubKeyFormat)[keyof typeof EkPubKeyFormat];
export declare const EkPubKeyType: {
  readonly ECC_SEC_P384: "ecc-sec-p384";
  readonly RSA_2048: "rsa-2048";
};
export type EkPubKeyType = (typeof EkPubKeyType)[keyof typeof EkPubKeyType];
export interface GetInstanceTpmEkPubRequest {
  InstanceId: string | undefined;
  KeyType: EkPubKeyType | undefined;
  KeyFormat: EkPubKeyFormat | undefined;
  DryRun?: boolean | undefined;
}
export interface GetInstanceTpmEkPubResult {
  InstanceId?: string | undefined;
  KeyType?: EkPubKeyType | undefined;
  KeyFormat?: EkPubKeyFormat | undefined;
  KeyValue?: string | undefined;
}
export interface GetInstanceTypesFromInstanceRequirementsRequest {
  DryRun?: boolean | undefined;
  ArchitectureTypes: ArchitectureType[] | undefined;
  VirtualizationTypes: VirtualizationType[] | undefined;
  InstanceRequirements: InstanceRequirementsRequest | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface InstanceTypeInfoFromInstanceRequirements {
  InstanceType?: string | undefined;
}
export interface GetInstanceTypesFromInstanceRequirementsResult {
  InstanceTypes?: InstanceTypeInfoFromInstanceRequirements[] | undefined;
  NextToken?: string | undefined;
}
export interface GetInstanceUefiDataRequest {
  InstanceId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetInstanceUefiDataResult {
  InstanceId?: string | undefined;
  UefiData?: string | undefined;
}
export interface GetIpamAddressHistoryRequest {
  DryRun?: boolean | undefined;
  Cidr: string | undefined;
  IpamScopeId: string | undefined;
  VpcId?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export declare const IpamComplianceStatus: {
  readonly compliant: "compliant";
  readonly ignored: "ignored";
  readonly noncompliant: "noncompliant";
  readonly unmanaged: "unmanaged";
};
export type IpamComplianceStatus =
  (typeof IpamComplianceStatus)[keyof typeof IpamComplianceStatus];
export declare const IpamOverlapStatus: {
  readonly ignored: "ignored";
  readonly nonoverlapping: "nonoverlapping";
  readonly overlapping: "overlapping";
};
export type IpamOverlapStatus =
  (typeof IpamOverlapStatus)[keyof typeof IpamOverlapStatus];
export declare const IpamAddressHistoryResourceType: {
  readonly eip: "eip";
  readonly instance: "instance";
  readonly network_interface: "network-interface";
  readonly subnet: "subnet";
  readonly vpc: "vpc";
};
export type IpamAddressHistoryResourceType =
  (typeof IpamAddressHistoryResourceType)[keyof typeof IpamAddressHistoryResourceType];
export interface IpamAddressHistoryRecord {
  ResourceOwnerId?: string | undefined;
  ResourceRegion?: string | undefined;
  ResourceType?: IpamAddressHistoryResourceType | undefined;
  ResourceId?: string | undefined;
  ResourceCidr?: string | undefined;
  ResourceName?: string | undefined;
  ResourceComplianceStatus?: IpamComplianceStatus | undefined;
  ResourceOverlapStatus?: IpamOverlapStatus | undefined;
  VpcId?: string | undefined;
  SampledStartTime?: Date | undefined;
  SampledEndTime?: Date | undefined;
}
export interface GetIpamAddressHistoryResult {
  HistoryRecords?: IpamAddressHistoryRecord[] | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamDiscoveredAccountsRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryId: string | undefined;
  DiscoveryRegion: string | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const IpamDiscoveryFailureCode: {
  readonly assume_role_failure: "assume-role-failure";
  readonly throttling_failure: "throttling-failure";
  readonly unauthorized_failure: "unauthorized-failure";
};
export type IpamDiscoveryFailureCode =
  (typeof IpamDiscoveryFailureCode)[keyof typeof IpamDiscoveryFailureCode];
export interface IpamDiscoveryFailureReason {
  Code?: IpamDiscoveryFailureCode | undefined;
  Message?: string | undefined;
}
export interface IpamDiscoveredAccount {
  AccountId?: string | undefined;
  DiscoveryRegion?: string | undefined;
  FailureReason?: IpamDiscoveryFailureReason | undefined;
  LastAttemptedDiscoveryTime?: Date | undefined;
  LastSuccessfulDiscoveryTime?: Date | undefined;
  OrganizationalUnitId?: string | undefined;
}
export interface GetIpamDiscoveredAccountsResult {
  IpamDiscoveredAccounts?: IpamDiscoveredAccount[] | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamDiscoveredPublicAddressesRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryId: string | undefined;
  AddressRegion: string | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const IpamPublicAddressType: {
  readonly AMAZON_OWNED_CONTIG: "amazon-owned-contig";
  readonly AMAZON_OWNED_EIP: "amazon-owned-eip";
  readonly BYOIP: "byoip";
  readonly EC2_PUBLIC_IP: "ec2-public-ip";
  readonly SERVICE_MANAGED_BYOIP: "service-managed-byoip";
  readonly SERVICE_MANAGED_IP: "service-managed-ip";
};
export type IpamPublicAddressType =
  (typeof IpamPublicAddressType)[keyof typeof IpamPublicAddressType];
export declare const IpamPublicAddressAssociationStatus: {
  readonly ASSOCIATED: "associated";
  readonly DISASSOCIATED: "disassociated";
};
export type IpamPublicAddressAssociationStatus =
  (typeof IpamPublicAddressAssociationStatus)[keyof typeof IpamPublicAddressAssociationStatus];
export interface IpamPublicAddressSecurityGroup {
  GroupName?: string | undefined;
  GroupId?: string | undefined;
}
export declare const IpamPublicAddressAwsService: {
  readonly AGA: "global-accelerator";
  readonly DMS: "database-migration-service";
  readonly EC2_LB: "load-balancer";
  readonly ECS: "elastic-container-service";
  readonly NAT_GATEWAY: "nat-gateway";
  readonly OTHER: "other";
  readonly RDS: "relational-database-service";
  readonly REDSHIFT: "redshift";
  readonly S2S_VPN: "site-to-site-vpn";
};
export type IpamPublicAddressAwsService =
  (typeof IpamPublicAddressAwsService)[keyof typeof IpamPublicAddressAwsService];
export interface IpamPublicAddressTag {
  Key?: string | undefined;
  Value?: string | undefined;
}
export interface IpamPublicAddressTags {
  EipTags?: IpamPublicAddressTag[] | undefined;
}
export interface IpamDiscoveredPublicAddress {
  IpamResourceDiscoveryId?: string | undefined;
  AddressRegion?: string | undefined;
  Address?: string | undefined;
  AddressOwnerId?: string | undefined;
  AddressAllocationId?: string | undefined;
  AssociationStatus?: IpamPublicAddressAssociationStatus | undefined;
  AddressType?: IpamPublicAddressType | undefined;
  Service?: IpamPublicAddressAwsService | undefined;
  ServiceResource?: string | undefined;
  VpcId?: string | undefined;
  SubnetId?: string | undefined;
  PublicIpv4PoolId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  NetworkInterfaceDescription?: string | undefined;
  InstanceId?: string | undefined;
  Tags?: IpamPublicAddressTags | undefined;
  NetworkBorderGroup?: string | undefined;
  SecurityGroups?: IpamPublicAddressSecurityGroup[] | undefined;
  SampleTime?: Date | undefined;
}
export interface GetIpamDiscoveredPublicAddressesResult {
  IpamDiscoveredPublicAddresses?: IpamDiscoveredPublicAddress[] | undefined;
  OldestSampleTime?: Date | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamDiscoveredResourceCidrsRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryId: string | undefined;
  ResourceRegion: string | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export declare const IpamResourceCidrIpSource: {
  readonly amazon: "amazon";
  readonly byoip: "byoip";
  readonly none: "none";
};
export type IpamResourceCidrIpSource =
  (typeof IpamResourceCidrIpSource)[keyof typeof IpamResourceCidrIpSource];
export declare const IpamNetworkInterfaceAttachmentStatus: {
  readonly available: "available";
  readonly in_use: "in-use";
};
export type IpamNetworkInterfaceAttachmentStatus =
  (typeof IpamNetworkInterfaceAttachmentStatus)[keyof typeof IpamNetworkInterfaceAttachmentStatus];
export declare const IpamResourceType: {
  readonly eip: "eip";
  readonly eni: "eni";
  readonly ipv6_pool: "ipv6-pool";
  readonly public_ipv4_pool: "public-ipv4-pool";
  readonly subnet: "subnet";
  readonly vpc: "vpc";
};
export type IpamResourceType =
  (typeof IpamResourceType)[keyof typeof IpamResourceType];
export interface IpamDiscoveredResourceCidr {
  IpamResourceDiscoveryId?: string | undefined;
  ResourceRegion?: string | undefined;
  ResourceId?: string | undefined;
  ResourceOwnerId?: string | undefined;
  ResourceCidr?: string | undefined;
  IpSource?: IpamResourceCidrIpSource | undefined;
  ResourceType?: IpamResourceType | undefined;
  ResourceTags?: IpamResourceTag[] | undefined;
  IpUsage?: number | undefined;
  VpcId?: string | undefined;
  SubnetId?: string | undefined;
  NetworkInterfaceAttachmentStatus?:
    | IpamNetworkInterfaceAttachmentStatus
    | undefined;
  SampleTime?: Date | undefined;
  AvailabilityZoneId?: string | undefined;
}
export interface GetIpamDiscoveredResourceCidrsResult {
  IpamDiscoveredResourceCidrs?: IpamDiscoveredResourceCidr[] | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamPoolAllocationsRequest {
  DryRun?: boolean | undefined;
  IpamPoolId: string | undefined;
  IpamPoolAllocationId?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamPoolAllocationsResult {
  IpamPoolAllocations?: IpamPoolAllocation[] | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamPoolCidrsRequest {
  DryRun?: boolean | undefined;
  IpamPoolId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamPoolCidrsResult {
  IpamPoolCidrs?: IpamPoolCidr[] | undefined;
  NextToken?: string | undefined;
}
export interface GetIpamResourceCidrsRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  IpamScopeId: string | undefined;
  IpamPoolId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: IpamResourceType | undefined;
  ResourceTag?: RequestIpamResourceTag | undefined;
  ResourceOwner?: string | undefined;
}
export declare const IpamManagementState: {
  readonly ignored: "ignored";
  readonly managed: "managed";
  readonly unmanaged: "unmanaged";
};
export type IpamManagementState =
  (typeof IpamManagementState)[keyof typeof IpamManagementState];
export interface IpamResourceCidr {
  IpamId?: string | undefined;
  IpamScopeId?: string | undefined;
  IpamPoolId?: string | undefined;
  ResourceRegion?: string | undefined;
  ResourceOwnerId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceName?: string | undefined;
  ResourceCidr?: string | undefined;
  ResourceType?: IpamResourceType | undefined;
  ResourceTags?: IpamResourceTag[] | undefined;
  IpUsage?: number | undefined;
  ComplianceStatus?: IpamComplianceStatus | undefined;
  ManagementState?: IpamManagementState | undefined;
  OverlapStatus?: IpamOverlapStatus | undefined;
  VpcId?: string | undefined;
  AvailabilityZoneId?: string | undefined;
}
export interface GetIpamResourceCidrsResult {
  NextToken?: string | undefined;
  IpamResourceCidrs?: IpamResourceCidr[] | undefined;
}
export interface GetLaunchTemplateDataRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
}
export interface GetLaunchTemplateDataResult {
  LaunchTemplateData?: ResponseLaunchTemplateData | undefined;
}
export interface GetManagedPrefixListAssociationsRequest {
  DryRun?: boolean | undefined;
  PrefixListId: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface PrefixListAssociation {
  ResourceId?: string | undefined;
  ResourceOwner?: string | undefined;
}
export interface GetManagedPrefixListAssociationsResult {
  PrefixListAssociations?: PrefixListAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface GetManagedPrefixListEntriesRequest {
  DryRun?: boolean | undefined;
  PrefixListId: string | undefined;
  TargetVersion?: number | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface PrefixListEntry {
  Cidr?: string | undefined;
  Description?: string | undefined;
}
export interface GetManagedPrefixListEntriesResult {
  Entries?: PrefixListEntry[] | undefined;
  NextToken?: string | undefined;
}
export interface GetNetworkInsightsAccessScopeAnalysisFindingsRequest {
  NetworkInsightsAccessScopeAnalysisId: string | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetNetworkInsightsAccessScopeAnalysisFindingsResult {
  NetworkInsightsAccessScopeAnalysisId?: string | undefined;
  AnalysisStatus?: AnalysisStatus | undefined;
  AnalysisFindings?: AccessScopeAnalysisFinding[] | undefined;
  NextToken?: string | undefined;
}
export interface GetNetworkInsightsAccessScopeContentRequest {
  NetworkInsightsAccessScopeId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetNetworkInsightsAccessScopeContentResult {
  NetworkInsightsAccessScopeContent?:
    | NetworkInsightsAccessScopeContent
    | undefined;
}
export interface GetPasswordDataRequest {
  InstanceId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetPasswordDataResult {
  InstanceId?: string | undefined;
  Timestamp?: Date | undefined;
  PasswordData?: string | undefined;
}
export interface GetReservedInstancesExchangeQuoteRequest {
  DryRun?: boolean | undefined;
  ReservedInstanceIds: string[] | undefined;
  TargetConfigurations?: TargetConfigurationRequest[] | undefined;
}
export interface ReservationValue {
  HourlyPrice?: string | undefined;
  RemainingTotalValue?: string | undefined;
  RemainingUpfrontValue?: string | undefined;
}
export interface ReservedInstanceReservationValue {
  ReservationValue?: ReservationValue | undefined;
  ReservedInstanceId?: string | undefined;
}
export interface TargetConfiguration {
  InstanceCount?: number | undefined;
  OfferingId?: string | undefined;
}
export interface TargetReservationValue {
  ReservationValue?: ReservationValue | undefined;
  TargetConfiguration?: TargetConfiguration | undefined;
}
export interface GetReservedInstancesExchangeQuoteResult {
  CurrencyCode?: string | undefined;
  IsValidExchange?: boolean | undefined;
  OutputReservedInstancesWillExpireAt?: Date | undefined;
  PaymentDue?: string | undefined;
  ReservedInstanceValueRollup?: ReservationValue | undefined;
  ReservedInstanceValueSet?: ReservedInstanceReservationValue[] | undefined;
  TargetConfigurationValueRollup?: ReservationValue | undefined;
  TargetConfigurationValueSet?: TargetReservationValue[] | undefined;
  ValidationFailureReason?: string | undefined;
}
export interface GetSecurityGroupsForVpcRequest {
  VpcId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface SecurityGroupForVpc {
  Description?: string | undefined;
  GroupName?: string | undefined;
  OwnerId?: string | undefined;
  GroupId?: string | undefined;
  Tags?: Tag[] | undefined;
  PrimaryVpcId?: string | undefined;
}
export interface GetSecurityGroupsForVpcResult {
  NextToken?: string | undefined;
  SecurityGroupForVpcs?: SecurityGroupForVpc[] | undefined;
}
export interface GetSerialConsoleAccessStatusRequest {
  DryRun?: boolean | undefined;
}
export interface GetSerialConsoleAccessStatusResult {
  SerialConsoleAccessEnabled?: boolean | undefined;
}
export interface GetSnapshotBlockPublicAccessStateRequest {
  DryRun?: boolean | undefined;
}
export interface GetSnapshotBlockPublicAccessStateResult {
  State?: SnapshotBlockPublicAccessState | undefined;
}
export interface InstanceRequirementsWithMetadataRequest {
  ArchitectureTypes?: ArchitectureType[] | undefined;
  VirtualizationTypes?: VirtualizationType[] | undefined;
  InstanceRequirements?: InstanceRequirementsRequest | undefined;
}
export interface GetSpotPlacementScoresRequest {
  InstanceTypes?: string[] | undefined;
  TargetCapacity: number | undefined;
  TargetCapacityUnitType?: TargetCapacityUnitType | undefined;
  SingleAvailabilityZone?: boolean | undefined;
  RegionNames?: string[] | undefined;
  InstanceRequirementsWithMetadata?:
    | InstanceRequirementsWithMetadataRequest
    | undefined;
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface SpotPlacementScore {
  Region?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  Score?: number | undefined;
}
export interface GetSpotPlacementScoresResult {
  SpotPlacementScores?: SpotPlacementScore[] | undefined;
  NextToken?: string | undefined;
}
export interface GetSubnetCidrReservationsRequest {
  Filters?: Filter[] | undefined;
  SubnetId: string | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface GetSubnetCidrReservationsResult {
  SubnetIpv4CidrReservations?: SubnetCidrReservation[] | undefined;
  SubnetIpv6CidrReservations?: SubnetCidrReservation[] | undefined;
  NextToken?: string | undefined;
}
export interface GetTransitGatewayAttachmentPropagationsRequest {
  TransitGatewayAttachmentId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayAttachmentPropagation {
  TransitGatewayRouteTableId?: string | undefined;
  State?: TransitGatewayPropagationState | undefined;
}
export interface GetTransitGatewayAttachmentPropagationsResult {
  TransitGatewayAttachmentPropagations?:
    | TransitGatewayAttachmentPropagation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface GetTransitGatewayMulticastDomainAssociationsRequest {
  TransitGatewayMulticastDomainId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayMulticastDomainAssociation {
  TransitGatewayAttachmentId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  ResourceOwnerId?: string | undefined;
  Subnet?: SubnetAssociation | undefined;
}
export interface GetTransitGatewayMulticastDomainAssociationsResult {
  MulticastDomainAssociations?:
    | TransitGatewayMulticastDomainAssociation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface GetTransitGatewayPolicyTableAssociationsRequest {
  TransitGatewayPolicyTableId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetTransitGatewayPolicyTableAssociationsResult {
  Associations?: TransitGatewayPolicyTableAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface GetTransitGatewayPolicyTableEntriesRequest {
  TransitGatewayPolicyTableId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayPolicyRuleMetaData {
  MetaDataKey?: string | undefined;
  MetaDataValue?: string | undefined;
}
export interface TransitGatewayPolicyRule {
  SourceCidrBlock?: string | undefined;
  SourcePortRange?: string | undefined;
  DestinationCidrBlock?: string | undefined;
  DestinationPortRange?: string | undefined;
  Protocol?: string | undefined;
  MetaData?: TransitGatewayPolicyRuleMetaData | undefined;
}
export interface TransitGatewayPolicyTableEntry {
  PolicyRuleNumber?: string | undefined;
  PolicyRule?: TransitGatewayPolicyRule | undefined;
  TargetRouteTableId?: string | undefined;
}
export interface GetTransitGatewayPolicyTableEntriesResult {
  TransitGatewayPolicyTableEntries?:
    | TransitGatewayPolicyTableEntry[]
    | undefined;
}
export interface GetTransitGatewayPrefixListReferencesRequest {
  TransitGatewayRouteTableId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetTransitGatewayPrefixListReferencesResult {
  TransitGatewayPrefixListReferences?:
    | TransitGatewayPrefixListReference[]
    | undefined;
  NextToken?: string | undefined;
}
export interface GetTransitGatewayRouteTableAssociationsRequest {
  TransitGatewayRouteTableId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayRouteTableAssociation {
  TransitGatewayAttachmentId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  State?: TransitGatewayAssociationState | undefined;
}
export interface GetTransitGatewayRouteTableAssociationsResult {
  Associations?: TransitGatewayRouteTableAssociation[] | undefined;
  NextToken?: string | undefined;
}
export interface GetTransitGatewayRouteTablePropagationsRequest {
  TransitGatewayRouteTableId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayRouteTablePropagation {
  TransitGatewayAttachmentId?: string | undefined;
  ResourceId?: string | undefined;
  ResourceType?: TransitGatewayAttachmentResourceType | undefined;
  State?: TransitGatewayPropagationState | undefined;
  TransitGatewayRouteTableAnnouncementId?: string | undefined;
}
export interface GetTransitGatewayRouteTablePropagationsResult {
  TransitGatewayRouteTablePropagations?:
    | TransitGatewayRouteTablePropagation[]
    | undefined;
  NextToken?: string | undefined;
}
export interface GetVerifiedAccessEndpointPolicyRequest {
  VerifiedAccessEndpointId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetVerifiedAccessEndpointPolicyResult {
  PolicyEnabled?: boolean | undefined;
  PolicyDocument?: string | undefined;
}
export interface GetVerifiedAccessGroupPolicyRequest {
  VerifiedAccessGroupId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetVerifiedAccessGroupPolicyResult {
  PolicyEnabled?: boolean | undefined;
  PolicyDocument?: string | undefined;
}
export interface GetVpnConnectionDeviceSampleConfigurationRequest {
  VpnConnectionId: string | undefined;
  VpnConnectionDeviceTypeId: string | undefined;
  InternetKeyExchangeVersion?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface GetVpnConnectionDeviceSampleConfigurationResult {
  VpnConnectionDeviceSampleConfiguration?: string | undefined;
}
export interface GetVpnConnectionDeviceTypesRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface VpnConnectionDeviceType {
  VpnConnectionDeviceTypeId?: string | undefined;
  Vendor?: string | undefined;
  Platform?: string | undefined;
  Software?: string | undefined;
}
export interface GetVpnConnectionDeviceTypesResult {
  VpnConnectionDeviceTypes?: VpnConnectionDeviceType[] | undefined;
  NextToken?: string | undefined;
}
export interface GetVpnTunnelReplacementStatusRequest {
  VpnConnectionId: string | undefined;
  VpnTunnelOutsideIpAddress: string | undefined;
  DryRun?: boolean | undefined;
}
export interface MaintenanceDetails {
  PendingMaintenance?: string | undefined;
  MaintenanceAutoAppliedAfter?: Date | undefined;
  LastMaintenanceApplied?: Date | undefined;
}
export interface GetVpnTunnelReplacementStatusResult {
  VpnConnectionId?: string | undefined;
  TransitGatewayId?: string | undefined;
  CustomerGatewayId?: string | undefined;
  VpnGatewayId?: string | undefined;
  VpnTunnelOutsideIpAddress?: string | undefined;
  MaintenanceDetails?: MaintenanceDetails | undefined;
}
export interface ImportClientVpnClientCertificateRevocationListRequest {
  ClientVpnEndpointId: string | undefined;
  CertificateRevocationList: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ImportClientVpnClientCertificateRevocationListResult {
  Return?: boolean | undefined;
}
export interface ClientData {
  Comment?: string | undefined;
  UploadEnd?: Date | undefined;
  UploadSize?: number | undefined;
  UploadStart?: Date | undefined;
}
export interface UserBucket {
  S3Bucket?: string | undefined;
  S3Key?: string | undefined;
}
export interface ImageDiskContainer {
  Description?: string | undefined;
  DeviceName?: string | undefined;
  Format?: string | undefined;
  SnapshotId?: string | undefined;
  Url?: string | undefined;
  UserBucket?: UserBucket | undefined;
}
export interface ImportImageLicenseConfigurationRequest {
  LicenseConfigurationArn?: string | undefined;
}
export interface ImportImageRequest {
  Architecture?: string | undefined;
  ClientData?: ClientData | undefined;
  ClientToken?: string | undefined;
  Description?: string | undefined;
  DiskContainers?: ImageDiskContainer[] | undefined;
  DryRun?: boolean | undefined;
  Encrypted?: boolean | undefined;
  Hypervisor?: string | undefined;
  KmsKeyId?: string | undefined;
  LicenseType?: string | undefined;
  Platform?: string | undefined;
  RoleName?: string | undefined;
  LicenseSpecifications?: ImportImageLicenseConfigurationRequest[] | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
  UsageOperation?: string | undefined;
  BootMode?: BootModeValues | undefined;
}
export interface ImportImageResult {
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
  LicenseSpecifications?: ImportImageLicenseConfigurationResponse[] | undefined;
  Tags?: Tag[] | undefined;
  UsageOperation?: string | undefined;
}
export interface DiskImageDetail {
  Format: DiskImageFormat | undefined;
  Bytes: number | undefined;
  ImportManifestUrl: string | undefined;
}
export interface VolumeDetail {
  Size: number | undefined;
}
export interface DiskImage {
  Description?: string | undefined;
  Image?: DiskImageDetail | undefined;
  Volume?: VolumeDetail | undefined;
}
export interface UserData {
  Data?: string | undefined;
}
export interface ImportInstanceLaunchSpecification {
  Architecture?: ArchitectureValues | undefined;
  GroupNames?: string[] | undefined;
  GroupIds?: string[] | undefined;
  AdditionalInfo?: string | undefined;
  UserData?: UserData | undefined;
  InstanceType?: _InstanceType | undefined;
  Placement?: Placement | undefined;
  Monitoring?: boolean | undefined;
  SubnetId?: string | undefined;
  InstanceInitiatedShutdownBehavior?: ShutdownBehavior | undefined;
  PrivateIpAddress?: string | undefined;
}
export interface ImportInstanceRequest {
  DryRun?: boolean | undefined;
  Description?: string | undefined;
  LaunchSpecification?: ImportInstanceLaunchSpecification | undefined;
  DiskImages?: DiskImage[] | undefined;
  Platform: PlatformValues | undefined;
}
export interface ImportInstanceResult {
  ConversionTask?: ConversionTask | undefined;
}
export interface ImportKeyPairRequest {
  TagSpecifications?: TagSpecification[] | undefined;
  DryRun?: boolean | undefined;
  KeyName: string | undefined;
  PublicKeyMaterial: Uint8Array | undefined;
}
export interface ImportKeyPairResult {
  KeyFingerprint?: string | undefined;
  KeyName?: string | undefined;
  KeyPairId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface SnapshotDiskContainer {
  Description?: string | undefined;
  Format?: string | undefined;
  Url?: string | undefined;
  UserBucket?: UserBucket | undefined;
}
export interface ImportSnapshotRequest {
  ClientData?: ClientData | undefined;
  ClientToken?: string | undefined;
  Description?: string | undefined;
  DiskContainer?: SnapshotDiskContainer | undefined;
  DryRun?: boolean | undefined;
  Encrypted?: boolean | undefined;
  KmsKeyId?: string | undefined;
  RoleName?: string | undefined;
  TagSpecifications?: TagSpecification[] | undefined;
}
export interface ImportSnapshotResult {
  Description?: string | undefined;
  ImportTaskId?: string | undefined;
  SnapshotTaskDetail?: SnapshotTaskDetail | undefined;
  Tags?: Tag[] | undefined;
}
export interface ImportVolumeRequest {
  DryRun?: boolean | undefined;
  AvailabilityZone: string | undefined;
  Image: DiskImageDetail | undefined;
  Description?: string | undefined;
  Volume: VolumeDetail | undefined;
}
export interface ImportVolumeResult {
  ConversionTask?: ConversionTask | undefined;
}
export interface ListImagesInRecycleBinRequest {
  ImageIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface ImageRecycleBinInfo {
  ImageId?: string | undefined;
  Name?: string | undefined;
  Description?: string | undefined;
  RecycleBinEnterTime?: Date | undefined;
  RecycleBinExitTime?: Date | undefined;
}
export interface ListImagesInRecycleBinResult {
  Images?: ImageRecycleBinInfo[] | undefined;
  NextToken?: string | undefined;
}
export interface ListSnapshotsInRecycleBinRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  SnapshotIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface SnapshotRecycleBinInfo {
  SnapshotId?: string | undefined;
  RecycleBinEnterTime?: Date | undefined;
  RecycleBinExitTime?: Date | undefined;
  Description?: string | undefined;
  VolumeId?: string | undefined;
}
export interface ListSnapshotsInRecycleBinResult {
  Snapshots?: SnapshotRecycleBinInfo[] | undefined;
  NextToken?: string | undefined;
}
export declare const LockMode: {
  readonly compliance: "compliance";
  readonly governance: "governance";
};
export type LockMode = (typeof LockMode)[keyof typeof LockMode];
export interface LockSnapshotRequest {
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
  LockMode: LockMode | undefined;
  CoolOffPeriod?: number | undefined;
  LockDuration?: number | undefined;
  ExpirationDate?: Date | undefined;
}
export interface LockSnapshotResult {
  SnapshotId?: string | undefined;
  LockState?: LockState | undefined;
  LockDuration?: number | undefined;
  CoolOffPeriod?: number | undefined;
  CoolOffPeriodExpiresOn?: Date | undefined;
  LockCreatedOn?: Date | undefined;
  LockExpiresOn?: Date | undefined;
  LockDurationStartTime?: Date | undefined;
}
export interface ModifyAddressAttributeRequest {
  AllocationId: string | undefined;
  DomainName?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyAddressAttributeResult {
  Address?: AddressAttribute | undefined;
}
export declare const ModifyAvailabilityZoneOptInStatus: {
  readonly not_opted_in: "not-opted-in";
  readonly opted_in: "opted-in";
};
export type ModifyAvailabilityZoneOptInStatus =
  (typeof ModifyAvailabilityZoneOptInStatus)[keyof typeof ModifyAvailabilityZoneOptInStatus];
export interface ModifyAvailabilityZoneGroupRequest {
  GroupName: string | undefined;
  OptInStatus: ModifyAvailabilityZoneOptInStatus | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyAvailabilityZoneGroupResult {
  Return?: boolean | undefined;
}
export interface ModifyCapacityReservationRequest {
  CapacityReservationId: string | undefined;
  InstanceCount?: number | undefined;
  EndDate?: Date | undefined;
  EndDateType?: EndDateType | undefined;
  Accept?: boolean | undefined;
  DryRun?: boolean | undefined;
  AdditionalInfo?: string | undefined;
  InstanceMatchCriteria?: InstanceMatchCriteria | undefined;
}
export interface ModifyCapacityReservationResult {
  Return?: boolean | undefined;
}
export interface ModifyCapacityReservationFleetRequest {
  CapacityReservationFleetId: string | undefined;
  TotalTargetCapacity?: number | undefined;
  EndDate?: Date | undefined;
  DryRun?: boolean | undefined;
  RemoveEndDate?: boolean | undefined;
}
export interface ModifyCapacityReservationFleetResult {
  Return?: boolean | undefined;
}
export interface DnsServersOptionsModifyStructure {
  CustomDnsServers?: string[] | undefined;
  Enabled?: boolean | undefined;
}
export interface ModifyClientVpnEndpointRequest {
  ClientVpnEndpointId: string | undefined;
  ServerCertificateArn?: string | undefined;
  ConnectionLogOptions?: ConnectionLogOptions | undefined;
  DnsServers?: DnsServersOptionsModifyStructure | undefined;
  VpnPort?: number | undefined;
  Description?: string | undefined;
  SplitTunnel?: boolean | undefined;
  DryRun?: boolean | undefined;
  SecurityGroupIds?: string[] | undefined;
  VpcId?: string | undefined;
  SelfServicePortal?: SelfServicePortal | undefined;
  ClientConnectOptions?: ClientConnectOptions | undefined;
  SessionTimeoutHours?: number | undefined;
  ClientLoginBannerOptions?: ClientLoginBannerOptions | undefined;
}
export interface ModifyClientVpnEndpointResult {
  Return?: boolean | undefined;
}
export interface ModifyDefaultCreditSpecificationRequest {
  DryRun?: boolean | undefined;
  InstanceFamily: UnlimitedSupportedInstanceFamily | undefined;
  CpuCredits: string | undefined;
}
export interface ModifyDefaultCreditSpecificationResult {
  InstanceFamilyCreditSpecification?:
    | InstanceFamilyCreditSpecification
    | undefined;
}
export interface ModifyEbsDefaultKmsKeyIdRequest {
  KmsKeyId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyEbsDefaultKmsKeyIdResult {
  KmsKeyId?: string | undefined;
}
export interface ModifyFleetRequest {
  DryRun?: boolean | undefined;
  ExcessCapacityTerminationPolicy?:
    | FleetExcessCapacityTerminationPolicy
    | undefined;
  LaunchTemplateConfigs?: FleetLaunchTemplateConfigRequest[] | undefined;
  FleetId: string | undefined;
  TargetCapacitySpecification?: TargetCapacitySpecificationRequest | undefined;
  Context?: string | undefined;
}
export interface ModifyFleetResult {
  Return?: boolean | undefined;
}
export interface LoadPermissionRequest {
  Group?: PermissionGroup | undefined;
  UserId?: string | undefined;
}
export interface LoadPermissionModifications {
  Add?: LoadPermissionRequest[] | undefined;
  Remove?: LoadPermissionRequest[] | undefined;
}
export declare const OperationType: {
  readonly add: "add";
  readonly remove: "remove";
};
export type OperationType = (typeof OperationType)[keyof typeof OperationType];
export interface ModifyFpgaImageAttributeRequest {
  DryRun?: boolean | undefined;
  FpgaImageId: string | undefined;
  Attribute?: FpgaImageAttributeName | undefined;
  OperationType?: OperationType | undefined;
  UserIds?: string[] | undefined;
  UserGroups?: string[] | undefined;
  ProductCodes?: string[] | undefined;
  LoadPermission?: LoadPermissionModifications | undefined;
  Description?: string | undefined;
  Name?: string | undefined;
}
export interface ModifyFpgaImageAttributeResult {
  FpgaImageAttribute?: FpgaImageAttribute | undefined;
}
export interface ModifyHostsRequest {
  HostRecovery?: HostRecovery | undefined;
  InstanceType?: string | undefined;
  InstanceFamily?: string | undefined;
  HostMaintenance?: HostMaintenance | undefined;
  HostIds: string[] | undefined;
  AutoPlacement?: AutoPlacement | undefined;
}
export interface ModifyHostsResult {
  Successful?: string[] | undefined;
  Unsuccessful?: UnsuccessfulItem[] | undefined;
}
export interface ModifyIdentityIdFormatRequest {
  Resource: string | undefined;
  UseLongIds: boolean | undefined;
  PrincipalArn: string | undefined;
}
export interface ModifyIdFormatRequest {
  Resource: string | undefined;
  UseLongIds: boolean | undefined;
}
export interface LaunchPermissionModifications {
  Add?: LaunchPermission[] | undefined;
  Remove?: LaunchPermission[] | undefined;
}
export interface ModifyImageAttributeRequest {
  Attribute?: string | undefined;
  Description?: AttributeValue | undefined;
  ImageId: string | undefined;
  LaunchPermission?: LaunchPermissionModifications | undefined;
  OperationType?: OperationType | undefined;
  ProductCodes?: string[] | undefined;
  UserGroups?: string[] | undefined;
  UserIds?: string[] | undefined;
  Value?: string | undefined;
  OrganizationArns?: string[] | undefined;
  OrganizationalUnitArns?: string[] | undefined;
  ImdsSupport?: AttributeValue | undefined;
  DryRun?: boolean | undefined;
}
export interface EbsInstanceBlockDeviceSpecification {
  VolumeId?: string | undefined;
  DeleteOnTermination?: boolean | undefined;
}
export interface InstanceBlockDeviceMappingSpecification {
  DeviceName?: string | undefined;
  Ebs?: EbsInstanceBlockDeviceSpecification | undefined;
  VirtualName?: string | undefined;
  NoDevice?: string | undefined;
}
export interface BlobAttributeValue {
  Value?: Uint8Array | undefined;
}
export interface ModifyInstanceAttributeRequest {
  SourceDestCheck?: AttributeBooleanValue | undefined;
  DisableApiStop?: AttributeBooleanValue | undefined;
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  Attribute?: InstanceAttributeName | undefined;
  Value?: string | undefined;
  BlockDeviceMappings?: InstanceBlockDeviceMappingSpecification[] | undefined;
  DisableApiTermination?: AttributeBooleanValue | undefined;
  InstanceType?: AttributeValue | undefined;
  Kernel?: AttributeValue | undefined;
  Ramdisk?: AttributeValue | undefined;
  UserData?: BlobAttributeValue | undefined;
  InstanceInitiatedShutdownBehavior?: AttributeValue | undefined;
  Groups?: string[] | undefined;
  EbsOptimized?: AttributeBooleanValue | undefined;
  SriovNetSupport?: AttributeValue | undefined;
  EnaSupport?: AttributeBooleanValue | undefined;
}
export interface CapacityReservationSpecification {
  CapacityReservationPreference?: CapacityReservationPreference | undefined;
  CapacityReservationTarget?: CapacityReservationTarget | undefined;
}
export interface ModifyInstanceCapacityReservationAttributesRequest {
  InstanceId: string | undefined;
  CapacityReservationSpecification:
    | CapacityReservationSpecification
    | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyInstanceCapacityReservationAttributesResult {
  Return?: boolean | undefined;
}
export interface ModifyInstanceCpuOptionsRequest {
  InstanceId: string | undefined;
  CoreCount: number | undefined;
  ThreadsPerCore: number | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyInstanceCpuOptionsResult {
  InstanceId?: string | undefined;
  CoreCount?: number | undefined;
  ThreadsPerCore?: number | undefined;
}
export interface InstanceCreditSpecificationRequest {
  InstanceId: string | undefined;
  CpuCredits?: string | undefined;
}
export interface ModifyInstanceCreditSpecificationRequest {
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
  InstanceCreditSpecifications:
    | InstanceCreditSpecificationRequest[]
    | undefined;
}
export interface SuccessfulInstanceCreditSpecificationItem {
  InstanceId?: string | undefined;
}
export declare const UnsuccessfulInstanceCreditSpecificationErrorCode: {
  readonly INCORRECT_INSTANCE_STATE: "IncorrectInstanceState";
  readonly INSTANCE_CREDIT_SPECIFICATION_NOT_SUPPORTED: "InstanceCreditSpecification.NotSupported";
  readonly INSTANCE_NOT_FOUND: "InvalidInstanceID.NotFound";
  readonly INVALID_INSTANCE_ID: "InvalidInstanceID.Malformed";
};
export type UnsuccessfulInstanceCreditSpecificationErrorCode =
  (typeof UnsuccessfulInstanceCreditSpecificationErrorCode)[keyof typeof UnsuccessfulInstanceCreditSpecificationErrorCode];
export interface UnsuccessfulInstanceCreditSpecificationItemError {
  Code?: UnsuccessfulInstanceCreditSpecificationErrorCode | undefined;
  Message?: string | undefined;
}
export interface UnsuccessfulInstanceCreditSpecificationItem {
  InstanceId?: string | undefined;
  Error?: UnsuccessfulInstanceCreditSpecificationItemError | undefined;
}
export interface ModifyInstanceCreditSpecificationResult {
  SuccessfulInstanceCreditSpecifications?:
    | SuccessfulInstanceCreditSpecificationItem[]
    | undefined;
  UnsuccessfulInstanceCreditSpecifications?:
    | UnsuccessfulInstanceCreditSpecificationItem[]
    | undefined;
}
export interface ModifyInstanceEventStartTimeRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  InstanceEventId: string | undefined;
  NotBefore: Date | undefined;
}
export interface ModifyInstanceEventStartTimeResult {
  Event?: InstanceStatusEvent | undefined;
}
export interface ModifyInstanceEventWindowRequest {
  DryRun?: boolean | undefined;
  Name?: string | undefined;
  InstanceEventWindowId: string | undefined;
  TimeRanges?: InstanceEventWindowTimeRangeRequest[] | undefined;
  CronExpression?: string | undefined;
}
export interface ModifyInstanceEventWindowResult {
  InstanceEventWindow?: InstanceEventWindow | undefined;
}
export interface ModifyInstanceMaintenanceOptionsRequest {
  InstanceId: string | undefined;
  AutoRecovery?: InstanceAutoRecoveryState | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyInstanceMaintenanceOptionsResult {
  InstanceId?: string | undefined;
  AutoRecovery?: InstanceAutoRecoveryState | undefined;
}
export declare const DefaultInstanceMetadataEndpointState: {
  readonly disabled: "disabled";
  readonly enabled: "enabled";
  readonly no_preference: "no-preference";
};
export type DefaultInstanceMetadataEndpointState =
  (typeof DefaultInstanceMetadataEndpointState)[keyof typeof DefaultInstanceMetadataEndpointState];
export declare const MetadataDefaultHttpTokensState: {
  readonly no_preference: "no-preference";
  readonly optional: "optional";
  readonly required: "required";
};
export type MetadataDefaultHttpTokensState =
  (typeof MetadataDefaultHttpTokensState)[keyof typeof MetadataDefaultHttpTokensState];
export declare const DefaultInstanceMetadataTagsState: {
  readonly disabled: "disabled";
  readonly enabled: "enabled";
  readonly no_preference: "no-preference";
};
export type DefaultInstanceMetadataTagsState =
  (typeof DefaultInstanceMetadataTagsState)[keyof typeof DefaultInstanceMetadataTagsState];
export interface ModifyInstanceMetadataDefaultsRequest {
  HttpTokens?: MetadataDefaultHttpTokensState | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpEndpoint?: DefaultInstanceMetadataEndpointState | undefined;
  InstanceMetadataTags?: DefaultInstanceMetadataTagsState | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifyInstanceMetadataDefaultsResult {
  Return?: boolean | undefined;
}
export interface ModifyInstanceMetadataOptionsRequest {
  InstanceId: string | undefined;
  HttpTokens?: HttpTokensState | undefined;
  HttpPutResponseHopLimit?: number | undefined;
  HttpEndpoint?: InstanceMetadataEndpointState | undefined;
  DryRun?: boolean | undefined;
  HttpProtocolIpv6?: InstanceMetadataProtocolState | undefined;
  InstanceMetadataTags?: InstanceMetadataTagsState | undefined;
}
export interface ModifyInstanceMetadataOptionsResult {
  InstanceId?: string | undefined;
  InstanceMetadataOptions?: InstanceMetadataOptionsResponse | undefined;
}
export declare const HostTenancy: {
  readonly dedicated: "dedicated";
  readonly default: "default";
  readonly host: "host";
};
export type HostTenancy = (typeof HostTenancy)[keyof typeof HostTenancy];
export interface ModifyInstancePlacementRequest {
  GroupName?: string | undefined;
  PartitionNumber?: number | undefined;
  HostResourceGroupArn?: string | undefined;
  GroupId?: string | undefined;
  InstanceId: string | undefined;
  Tenancy?: HostTenancy | undefined;
  Affinity?: Affinity | undefined;
  HostId?: string | undefined;
}
export interface ModifyInstancePlacementResult {
  Return?: boolean | undefined;
}
export interface RemoveIpamOperatingRegion {
  RegionName?: string | undefined;
}
export interface ModifyIpamRequest {
  DryRun?: boolean | undefined;
  IpamId: string | undefined;
  Description?: string | undefined;
  AddOperatingRegions?: AddIpamOperatingRegion[] | undefined;
  RemoveOperatingRegions?: RemoveIpamOperatingRegion[] | undefined;
  Tier?: IpamTier | undefined;
  EnablePrivateGua?: boolean | undefined;
}
export interface ModifyIpamResult {
  Ipam?: Ipam | undefined;
}
export interface ModifyIpamPoolRequest {
  DryRun?: boolean | undefined;
  IpamPoolId: string | undefined;
  Description?: string | undefined;
  AutoImport?: boolean | undefined;
  AllocationMinNetmaskLength?: number | undefined;
  AllocationMaxNetmaskLength?: number | undefined;
  AllocationDefaultNetmaskLength?: number | undefined;
  ClearAllocationDefaultNetmaskLength?: boolean | undefined;
  AddAllocationResourceTags?: RequestIpamResourceTag[] | undefined;
  RemoveAllocationResourceTags?: RequestIpamResourceTag[] | undefined;
}
export interface ModifyIpamPoolResult {
  IpamPool?: IpamPool | undefined;
}
export interface ModifyIpamResourceCidrRequest {
  DryRun?: boolean | undefined;
  ResourceId: string | undefined;
  ResourceCidr: string | undefined;
  ResourceRegion: string | undefined;
  CurrentIpamScopeId: string | undefined;
  DestinationIpamScopeId?: string | undefined;
  Monitored: boolean | undefined;
}
export interface ModifyIpamResourceCidrResult {
  IpamResourceCidr?: IpamResourceCidr | undefined;
}
export interface RemoveIpamOrganizationalUnitExclusion {
  OrganizationsEntityPath?: string | undefined;
}
export interface ModifyIpamResourceDiscoveryRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryId: string | undefined;
  Description?: string | undefined;
  AddOperatingRegions?: AddIpamOperatingRegion[] | undefined;
  RemoveOperatingRegions?: RemoveIpamOperatingRegion[] | undefined;
  AddOrganizationalUnitExclusions?:
    | AddIpamOrganizationalUnitExclusion[]
    | undefined;
  RemoveOrganizationalUnitExclusions?:
    | RemoveIpamOrganizationalUnitExclusion[]
    | undefined;
}
export interface ModifyIpamResourceDiscoveryResult {
  IpamResourceDiscovery?: IpamResourceDiscovery | undefined;
}
export interface ModifyIpamScopeRequest {
  DryRun?: boolean | undefined;
  IpamScopeId: string | undefined;
  Description?: string | undefined;
}
export interface ModifyIpamScopeResult {
  IpamScope?: IpamScope | undefined;
}
export interface ModifyLaunchTemplateRequest {
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  DefaultVersion?: string | undefined;
}
export interface ModifyLaunchTemplateResult {
  LaunchTemplate?: LaunchTemplate | undefined;
}
export interface ModifyLocalGatewayRouteRequest {
  DestinationCidrBlock?: string | undefined;
  LocalGatewayRouteTableId: string | undefined;
  LocalGatewayVirtualInterfaceGroupId?: string | undefined;
  NetworkInterfaceId?: string | undefined;
  DryRun?: boolean | undefined;
  DestinationPrefixListId?: string | undefined;
}
export interface ModifyLocalGatewayRouteResult {
  Route?: LocalGatewayRoute | undefined;
}
export interface RemovePrefixListEntry {
  Cidr: string | undefined;
}
export interface ModifyManagedPrefixListRequest {
  DryRun?: boolean | undefined;
  PrefixListId: string | undefined;
  CurrentVersion?: number | undefined;
  PrefixListName?: string | undefined;
  AddEntries?: AddPrefixListEntry[] | undefined;
  RemoveEntries?: RemovePrefixListEntry[] | undefined;
  MaxEntries?: number | undefined;
}
export interface ModifyManagedPrefixListResult {
  PrefixList?: ManagedPrefixList | undefined;
}
export interface NetworkInterfaceAttachmentChanges {
  AttachmentId?: string | undefined;
  DeleteOnTermination?: boolean | undefined;
}
export interface ModifyNetworkInterfaceAttributeRequest {
  EnaSrdSpecification?: EnaSrdSpecification | undefined;
  EnablePrimaryIpv6?: boolean | undefined;
  ConnectionTrackingSpecification?:
    | ConnectionTrackingSpecificationRequest
    | undefined;
  AssociatePublicIpAddress?: boolean | undefined;
  DryRun?: boolean | undefined;
  NetworkInterfaceId: string | undefined;
  Description?: AttributeValue | undefined;
  SourceDestCheck?: AttributeBooleanValue | undefined;
  Groups?: string[] | undefined;
  Attachment?: NetworkInterfaceAttachmentChanges | undefined;
}
export interface ModifyPrivateDnsNameOptionsRequest {
  DryRun?: boolean | undefined;
  InstanceId: string | undefined;
  PrivateDnsHostnameType?: HostnameType | undefined;
  EnableResourceNameDnsARecord?: boolean | undefined;
  EnableResourceNameDnsAAAARecord?: boolean | undefined;
}
export interface ModifyPrivateDnsNameOptionsResult {
  Return?: boolean | undefined;
}
export interface ModifyReservedInstancesRequest {
  ReservedInstancesIds: string[] | undefined;
  ClientToken?: string | undefined;
  TargetConfigurations: ReservedInstancesConfiguration[] | undefined;
}
export interface ModifyReservedInstancesResult {
  ReservedInstancesModificationId?: string | undefined;
}
export interface SecurityGroupRuleRequest {
  IpProtocol?: string | undefined;
  FromPort?: number | undefined;
  ToPort?: number | undefined;
  CidrIpv4?: string | undefined;
  CidrIpv6?: string | undefined;
  PrefixListId?: string | undefined;
  ReferencedGroupId?: string | undefined;
  Description?: string | undefined;
}
export interface SecurityGroupRuleUpdate {
  SecurityGroupRuleId: string | undefined;
  SecurityGroupRule?: SecurityGroupRuleRequest | undefined;
}
export interface ModifySecurityGroupRulesRequest {
  GroupId: string | undefined;
  SecurityGroupRules: SecurityGroupRuleUpdate[] | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifySecurityGroupRulesResult {
  Return?: boolean | undefined;
}
export interface CreateVolumePermissionModifications {
  Add?: CreateVolumePermission[] | undefined;
  Remove?: CreateVolumePermission[] | undefined;
}
export interface ModifySnapshotAttributeRequest {
  Attribute?: SnapshotAttributeName | undefined;
  CreateVolumePermission?: CreateVolumePermissionModifications | undefined;
  GroupNames?: string[] | undefined;
  OperationType?: OperationType | undefined;
  SnapshotId: string | undefined;
  UserIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const TargetStorageTier: {
  readonly archive: "archive";
};
export type TargetStorageTier =
  (typeof TargetStorageTier)[keyof typeof TargetStorageTier];
export interface ModifySnapshotTierRequest {
  SnapshotId: string | undefined;
  StorageTier?: TargetStorageTier | undefined;
  DryRun?: boolean | undefined;
}
export interface ModifySnapshotTierResult {
  SnapshotId?: string | undefined;
  TieringStartTime?: Date | undefined;
}
export interface ModifySpotFleetRequestRequest {
  LaunchTemplateConfigs?: LaunchTemplateConfig[] | undefined;
  OnDemandTargetCapacity?: number | undefined;
  Context?: string | undefined;
  SpotFleetRequestId: string | undefined;
  TargetCapacity?: number | undefined;
  ExcessCapacityTerminationPolicy?: ExcessCapacityTerminationPolicy | undefined;
}
export interface ModifySpotFleetRequestResponse {
  Return?: boolean | undefined;
}
export interface ModifySubnetAttributeRequest {
  AssignIpv6AddressOnCreation?: AttributeBooleanValue | undefined;
  MapPublicIpOnLaunch?: AttributeBooleanValue | undefined;
  SubnetId: string | undefined;
  MapCustomerOwnedIpOnLaunch?: AttributeBooleanValue | undefined;
  CustomerOwnedIpv4Pool?: string | undefined;
  EnableDns64?: AttributeBooleanValue | undefined;
  PrivateDnsHostnameTypeOnLaunch?: HostnameType | undefined;
  EnableResourceNameDnsARecordOnLaunch?: AttributeBooleanValue | undefined;
  EnableResourceNameDnsAAAARecordOnLaunch?: AttributeBooleanValue | undefined;
  EnableLniAtDeviceIndex?: number | undefined;
  DisableLniAtDeviceIndex?: AttributeBooleanValue | undefined;
}
export declare const GetInstanceTpmEkPubResultFilterSensitiveLog: (
  obj: GetInstanceTpmEkPubResult
) => any;
export declare const GetLaunchTemplateDataResultFilterSensitiveLog: (
  obj: GetLaunchTemplateDataResult
) => any;
export declare const GetPasswordDataResultFilterSensitiveLog: (
  obj: GetPasswordDataResult
) => any;
export declare const GetVpnConnectionDeviceSampleConfigurationResultFilterSensitiveLog: (
  obj: GetVpnConnectionDeviceSampleConfigurationResult
) => any;
export declare const ImageDiskContainerFilterSensitiveLog: (
  obj: ImageDiskContainer
) => any;
export declare const ImportImageRequestFilterSensitiveLog: (
  obj: ImportImageRequest
) => any;
export declare const ImportImageResultFilterSensitiveLog: (
  obj: ImportImageResult
) => any;
export declare const DiskImageDetailFilterSensitiveLog: (
  obj: DiskImageDetail
) => any;
export declare const DiskImageFilterSensitiveLog: (obj: DiskImage) => any;
export declare const UserDataFilterSensitiveLog: (obj: UserData) => any;
export declare const ImportInstanceLaunchSpecificationFilterSensitiveLog: (
  obj: ImportInstanceLaunchSpecification
) => any;
export declare const ImportInstanceRequestFilterSensitiveLog: (
  obj: ImportInstanceRequest
) => any;
export declare const ImportInstanceResultFilterSensitiveLog: (
  obj: ImportInstanceResult
) => any;
export declare const SnapshotDiskContainerFilterSensitiveLog: (
  obj: SnapshotDiskContainer
) => any;
export declare const ImportSnapshotRequestFilterSensitiveLog: (
  obj: ImportSnapshotRequest
) => any;
export declare const ImportSnapshotResultFilterSensitiveLog: (
  obj: ImportSnapshotResult
) => any;
export declare const ImportVolumeRequestFilterSensitiveLog: (
  obj: ImportVolumeRequest
) => any;
export declare const ImportVolumeResultFilterSensitiveLog: (
  obj: ImportVolumeResult
) => any;
