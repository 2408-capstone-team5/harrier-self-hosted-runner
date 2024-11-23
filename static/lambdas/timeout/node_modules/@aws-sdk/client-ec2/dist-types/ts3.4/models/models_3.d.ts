import {
  AccountAttribute,
  AccountAttributeName,
  ActiveInstance,
  Address,
  AddressAttribute,
  AddressAttributeName,
  AddressTransfer,
  AssociationStatus,
  BundleTask,
  ByoipCidr,
  CapacityReservationFleetState,
  CapacityReservationTenancy,
  ClientVpnAuthorizationRuleStatus,
  InstanceEventWindowState,
  Tag,
  TransitGatewayPeeringAttachment,
  TransitGatewayVpcAttachment,
  UnsuccessfulItem,
  VerifiedAccessInstance,
  VerifiedAccessTrustProvider,
} from "./models_0";
import {
  _InstanceType,
  CapacityReservation,
  CarrierGateway,
  ClientVpnAuthenticationType,
  ClientVpnEndpointStatus,
  ClientVpnRouteStatus,
  CoipPool,
  CustomerGateway,
  DefaultTargetCapacityType,
  DestinationFileFormat,
  DhcpOptions,
  DiskImageFormat,
  Ec2InstanceConnectEndpoint,
  EgressOnlyInternetGateway,
  ExportTask,
  FleetCapacityReservation,
  FleetCapacityReservationTenancy,
  FleetCapacityReservationUsageStrategy,
  FleetExcessCapacityTerminationPolicy,
  FleetInstanceMatchCriteria,
  FleetLaunchTemplateOverrides,
  FleetLaunchTemplateSpecification,
  FleetOnDemandAllocationStrategy,
  FleetReplacementStrategy,
  FleetType,
  InstanceLifecycle,
  Ipam,
  IpamExternalResourceVerificationToken,
  IpamPool,
  IpamResourceDiscovery,
  IpamScope,
  LaunchTemplate,
  LaunchTemplateAndOverridesResponse,
  LocalGatewayRoute,
  LocalGatewayRouteTable,
  LocalGatewayRouteTableVirtualInterfaceGroupAssociation,
  LocalGatewayRouteTableVpcAssociation,
  LogDestinationType,
  ManagedPrefixList,
  PlatformValues,
  SpotAllocationStrategy,
  SpotInstanceInterruptionBehavior,
  TargetCapacityUnitType,
  TrafficType,
  TransportProtocol,
} from "./models_1";
import {
  FleetStateCode,
  GroupIdentifier,
  SubnetCidrReservation,
  TransitGateway,
  TransitGatewayConnect,
  TransitGatewayConnectPeer,
  TransitGatewayMulticastDomain,
  TransitGatewayPolicyTable,
  TransitGatewayPrefixListReference,
  TransitGatewayRoute,
  TransitGatewayRouteTable,
  TransitGatewayRouteTableAnnouncement,
  VerifiedAccessEndpoint,
  VerifiedAccessGroup,
  VpcBlockPublicAccessExclusion,
} from "./models_2";
export interface DeleteFpgaImageResult {
  Return?: boolean | undefined;
}
export interface DeleteInstanceConnectEndpointRequest {
  DryRun?: boolean | undefined;
  InstanceConnectEndpointId: string | undefined;
}
export interface DeleteInstanceConnectEndpointResult {
  InstanceConnectEndpoint?: Ec2InstanceConnectEndpoint | undefined;
}
export interface DeleteInstanceEventWindowRequest {
  DryRun?: boolean | undefined;
  ForceDelete?: boolean | undefined;
  InstanceEventWindowId: string | undefined;
}
export interface InstanceEventWindowStateChange {
  InstanceEventWindowId?: string | undefined;
  State?: InstanceEventWindowState | undefined;
}
export interface DeleteInstanceEventWindowResult {
  InstanceEventWindowState?: InstanceEventWindowStateChange | undefined;
}
export interface DeleteInternetGatewayRequest {
  DryRun?: boolean | undefined;
  InternetGatewayId: string | undefined;
}
export interface DeleteIpamRequest {
  DryRun?: boolean | undefined;
  IpamId: string | undefined;
  Cascade?: boolean | undefined;
}
export interface DeleteIpamResult {
  Ipam?: Ipam | undefined;
}
export interface DeleteIpamExternalResourceVerificationTokenRequest {
  DryRun?: boolean | undefined;
  IpamExternalResourceVerificationTokenId: string | undefined;
}
export interface DeleteIpamExternalResourceVerificationTokenResult {
  IpamExternalResourceVerificationToken?:
    | IpamExternalResourceVerificationToken
    | undefined;
}
export interface DeleteIpamPoolRequest {
  DryRun?: boolean | undefined;
  IpamPoolId: string | undefined;
  Cascade?: boolean | undefined;
}
export interface DeleteIpamPoolResult {
  IpamPool?: IpamPool | undefined;
}
export interface DeleteIpamResourceDiscoveryRequest {
  DryRun?: boolean | undefined;
  IpamResourceDiscoveryId: string | undefined;
}
export interface DeleteIpamResourceDiscoveryResult {
  IpamResourceDiscovery?: IpamResourceDiscovery | undefined;
}
export interface DeleteIpamScopeRequest {
  DryRun?: boolean | undefined;
  IpamScopeId: string | undefined;
}
export interface DeleteIpamScopeResult {
  IpamScope?: IpamScope | undefined;
}
export interface DeleteKeyPairRequest {
  KeyName?: string | undefined;
  KeyPairId?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteKeyPairResult {
  Return?: boolean | undefined;
  KeyPairId?: string | undefined;
}
export interface DeleteLaunchTemplateRequest {
  DryRun?: boolean | undefined;
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
}
export interface DeleteLaunchTemplateResult {
  LaunchTemplate?: LaunchTemplate | undefined;
}
export interface DeleteLaunchTemplateVersionsRequest {
  DryRun?: boolean | undefined;
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Versions: string[] | undefined;
}
export interface DeleteLaunchTemplateVersionsResponseSuccessItem {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  VersionNumber?: number | undefined;
}
export declare const LaunchTemplateErrorCode: {
  readonly LAUNCH_TEMPLATE_ID_DOES_NOT_EXIST: "launchTemplateIdDoesNotExist";
  readonly LAUNCH_TEMPLATE_ID_MALFORMED: "launchTemplateIdMalformed";
  readonly LAUNCH_TEMPLATE_NAME_DOES_NOT_EXIST: "launchTemplateNameDoesNotExist";
  readonly LAUNCH_TEMPLATE_NAME_MALFORMED: "launchTemplateNameMalformed";
  readonly LAUNCH_TEMPLATE_VERSION_DOES_NOT_EXIST: "launchTemplateVersionDoesNotExist";
  readonly UNEXPECTED_ERROR: "unexpectedError";
};
export type LaunchTemplateErrorCode =
  (typeof LaunchTemplateErrorCode)[keyof typeof LaunchTemplateErrorCode];
export interface ResponseError {
  Code?: LaunchTemplateErrorCode | undefined;
  Message?: string | undefined;
}
export interface DeleteLaunchTemplateVersionsResponseErrorItem {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  VersionNumber?: number | undefined;
  ResponseError?: ResponseError | undefined;
}
export interface DeleteLaunchTemplateVersionsResult {
  SuccessfullyDeletedLaunchTemplateVersions?:
    | DeleteLaunchTemplateVersionsResponseSuccessItem[]
    | undefined;
  UnsuccessfullyDeletedLaunchTemplateVersions?:
    | DeleteLaunchTemplateVersionsResponseErrorItem[]
    | undefined;
}
export interface DeleteLocalGatewayRouteRequest {
  DestinationCidrBlock?: string | undefined;
  LocalGatewayRouteTableId: string | undefined;
  DryRun?: boolean | undefined;
  DestinationPrefixListId?: string | undefined;
}
export interface DeleteLocalGatewayRouteResult {
  Route?: LocalGatewayRoute | undefined;
}
export interface DeleteLocalGatewayRouteTableRequest {
  LocalGatewayRouteTableId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteLocalGatewayRouteTableResult {
  LocalGatewayRouteTable?: LocalGatewayRouteTable | undefined;
}
export interface DeleteLocalGatewayRouteTableVirtualInterfaceGroupAssociationRequest {
  LocalGatewayRouteTableVirtualInterfaceGroupAssociationId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteLocalGatewayRouteTableVirtualInterfaceGroupAssociationResult {
  LocalGatewayRouteTableVirtualInterfaceGroupAssociation?:
    | LocalGatewayRouteTableVirtualInterfaceGroupAssociation
    | undefined;
}
export interface DeleteLocalGatewayRouteTableVpcAssociationRequest {
  LocalGatewayRouteTableVpcAssociationId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteLocalGatewayRouteTableVpcAssociationResult {
  LocalGatewayRouteTableVpcAssociation?:
    | LocalGatewayRouteTableVpcAssociation
    | undefined;
}
export interface DeleteManagedPrefixListRequest {
  DryRun?: boolean | undefined;
  PrefixListId: string | undefined;
}
export interface DeleteManagedPrefixListResult {
  PrefixList?: ManagedPrefixList | undefined;
}
export interface DeleteNatGatewayRequest {
  DryRun?: boolean | undefined;
  NatGatewayId: string | undefined;
}
export interface DeleteNatGatewayResult {
  NatGatewayId?: string | undefined;
}
export interface DeleteNetworkAclRequest {
  DryRun?: boolean | undefined;
  NetworkAclId: string | undefined;
}
export interface DeleteNetworkAclEntryRequest {
  DryRun?: boolean | undefined;
  NetworkAclId: string | undefined;
  RuleNumber: number | undefined;
  Egress: boolean | undefined;
}
export interface DeleteNetworkInsightsAccessScopeRequest {
  DryRun?: boolean | undefined;
  NetworkInsightsAccessScopeId: string | undefined;
}
export interface DeleteNetworkInsightsAccessScopeResult {
  NetworkInsightsAccessScopeId?: string | undefined;
}
export interface DeleteNetworkInsightsAccessScopeAnalysisRequest {
  NetworkInsightsAccessScopeAnalysisId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteNetworkInsightsAccessScopeAnalysisResult {
  NetworkInsightsAccessScopeAnalysisId?: string | undefined;
}
export interface DeleteNetworkInsightsAnalysisRequest {
  DryRun?: boolean | undefined;
  NetworkInsightsAnalysisId: string | undefined;
}
export interface DeleteNetworkInsightsAnalysisResult {
  NetworkInsightsAnalysisId?: string | undefined;
}
export interface DeleteNetworkInsightsPathRequest {
  DryRun?: boolean | undefined;
  NetworkInsightsPathId: string | undefined;
}
export interface DeleteNetworkInsightsPathResult {
  NetworkInsightsPathId?: string | undefined;
}
export interface DeleteNetworkInterfaceRequest {
  DryRun?: boolean | undefined;
  NetworkInterfaceId: string | undefined;
}
export interface DeleteNetworkInterfacePermissionRequest {
  NetworkInterfacePermissionId: string | undefined;
  Force?: boolean | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteNetworkInterfacePermissionResult {
  Return?: boolean | undefined;
}
export interface DeletePlacementGroupRequest {
  DryRun?: boolean | undefined;
  GroupName: string | undefined;
}
export interface DeletePublicIpv4PoolRequest {
  DryRun?: boolean | undefined;
  PoolId: string | undefined;
  NetworkBorderGroup?: string | undefined;
}
export interface DeletePublicIpv4PoolResult {
  ReturnValue?: boolean | undefined;
}
export interface DeleteQueuedReservedInstancesRequest {
  DryRun?: boolean | undefined;
  ReservedInstancesIds: string[] | undefined;
}
export declare const DeleteQueuedReservedInstancesErrorCode: {
  readonly RESERVED_INSTANCES_ID_INVALID: "reserved-instances-id-invalid";
  readonly RESERVED_INSTANCES_NOT_IN_QUEUED_STATE: "reserved-instances-not-in-queued-state";
  readonly UNEXPECTED_ERROR: "unexpected-error";
};
export type DeleteQueuedReservedInstancesErrorCode =
  (typeof DeleteQueuedReservedInstancesErrorCode)[keyof typeof DeleteQueuedReservedInstancesErrorCode];
export interface DeleteQueuedReservedInstancesError {
  Code?: DeleteQueuedReservedInstancesErrorCode | undefined;
  Message?: string | undefined;
}
export interface FailedQueuedPurchaseDeletion {
  Error?: DeleteQueuedReservedInstancesError | undefined;
  ReservedInstancesId?: string | undefined;
}
export interface SuccessfulQueuedPurchaseDeletion {
  ReservedInstancesId?: string | undefined;
}
export interface DeleteQueuedReservedInstancesResult {
  SuccessfulQueuedPurchaseDeletions?:
    | SuccessfulQueuedPurchaseDeletion[]
    | undefined;
  FailedQueuedPurchaseDeletions?: FailedQueuedPurchaseDeletion[] | undefined;
}
export interface DeleteRouteRequest {
  DestinationPrefixListId?: string | undefined;
  DryRun?: boolean | undefined;
  RouteTableId: string | undefined;
  DestinationCidrBlock?: string | undefined;
  DestinationIpv6CidrBlock?: string | undefined;
}
export interface DeleteRouteTableRequest {
  DryRun?: boolean | undefined;
  RouteTableId: string | undefined;
}
export interface DeleteSecurityGroupRequest {
  GroupId?: string | undefined;
  GroupName?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteSnapshotRequest {
  SnapshotId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteSpotDatafeedSubscriptionRequest {
  DryRun?: boolean | undefined;
}
export interface DeleteSubnetRequest {
  SubnetId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteSubnetCidrReservationRequest {
  SubnetCidrReservationId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteSubnetCidrReservationResult {
  DeletedSubnetCidrReservation?: SubnetCidrReservation | undefined;
}
export interface DeleteTagsRequest {
  DryRun?: boolean | undefined;
  Resources: string[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface DeleteTrafficMirrorFilterRequest {
  TrafficMirrorFilterId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTrafficMirrorFilterResult {
  TrafficMirrorFilterId?: string | undefined;
}
export interface DeleteTrafficMirrorFilterRuleRequest {
  TrafficMirrorFilterRuleId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTrafficMirrorFilterRuleResult {
  TrafficMirrorFilterRuleId?: string | undefined;
}
export interface DeleteTrafficMirrorSessionRequest {
  TrafficMirrorSessionId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTrafficMirrorSessionResult {
  TrafficMirrorSessionId?: string | undefined;
}
export interface DeleteTrafficMirrorTargetRequest {
  TrafficMirrorTargetId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTrafficMirrorTargetResult {
  TrafficMirrorTargetId?: string | undefined;
}
export interface DeleteTransitGatewayRequest {
  TransitGatewayId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayResult {
  TransitGateway?: TransitGateway | undefined;
}
export interface DeleteTransitGatewayConnectRequest {
  TransitGatewayAttachmentId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayConnectResult {
  TransitGatewayConnect?: TransitGatewayConnect | undefined;
}
export interface DeleteTransitGatewayConnectPeerRequest {
  TransitGatewayConnectPeerId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayConnectPeerResult {
  TransitGatewayConnectPeer?: TransitGatewayConnectPeer | undefined;
}
export interface DeleteTransitGatewayMulticastDomainRequest {
  TransitGatewayMulticastDomainId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayMulticastDomainResult {
  TransitGatewayMulticastDomain?: TransitGatewayMulticastDomain | undefined;
}
export interface DeleteTransitGatewayPeeringAttachmentRequest {
  TransitGatewayAttachmentId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayPeeringAttachmentResult {
  TransitGatewayPeeringAttachment?: TransitGatewayPeeringAttachment | undefined;
}
export interface DeleteTransitGatewayPolicyTableRequest {
  TransitGatewayPolicyTableId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayPolicyTableResult {
  TransitGatewayPolicyTable?: TransitGatewayPolicyTable | undefined;
}
export interface DeleteTransitGatewayPrefixListReferenceRequest {
  TransitGatewayRouteTableId: string | undefined;
  PrefixListId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayPrefixListReferenceResult {
  TransitGatewayPrefixListReference?:
    | TransitGatewayPrefixListReference
    | undefined;
}
export interface DeleteTransitGatewayRouteRequest {
  TransitGatewayRouteTableId: string | undefined;
  DestinationCidrBlock: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayRouteResult {
  Route?: TransitGatewayRoute | undefined;
}
export interface DeleteTransitGatewayRouteTableRequest {
  TransitGatewayRouteTableId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayRouteTableResult {
  TransitGatewayRouteTable?: TransitGatewayRouteTable | undefined;
}
export interface DeleteTransitGatewayRouteTableAnnouncementRequest {
  TransitGatewayRouteTableAnnouncementId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayRouteTableAnnouncementResult {
  TransitGatewayRouteTableAnnouncement?:
    | TransitGatewayRouteTableAnnouncement
    | undefined;
}
export interface DeleteTransitGatewayVpcAttachmentRequest {
  TransitGatewayAttachmentId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteTransitGatewayVpcAttachmentResult {
  TransitGatewayVpcAttachment?: TransitGatewayVpcAttachment | undefined;
}
export interface DeleteVerifiedAccessEndpointRequest {
  VerifiedAccessEndpointId: string | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteVerifiedAccessEndpointResult {
  VerifiedAccessEndpoint?: VerifiedAccessEndpoint | undefined;
}
export interface DeleteVerifiedAccessGroupRequest {
  VerifiedAccessGroupId: string | undefined;
  ClientToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteVerifiedAccessGroupResult {
  VerifiedAccessGroup?: VerifiedAccessGroup | undefined;
}
export interface DeleteVerifiedAccessInstanceRequest {
  VerifiedAccessInstanceId: string | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
}
export interface DeleteVerifiedAccessInstanceResult {
  VerifiedAccessInstance?: VerifiedAccessInstance | undefined;
}
export interface DeleteVerifiedAccessTrustProviderRequest {
  VerifiedAccessTrustProviderId: string | undefined;
  DryRun?: boolean | undefined;
  ClientToken?: string | undefined;
}
export interface DeleteVerifiedAccessTrustProviderResult {
  VerifiedAccessTrustProvider?: VerifiedAccessTrustProvider | undefined;
}
export interface DeleteVolumeRequest {
  VolumeId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteVpcRequest {
  VpcId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteVpcBlockPublicAccessExclusionRequest {
  DryRun?: boolean | undefined;
  ExclusionId: string | undefined;
}
export interface DeleteVpcBlockPublicAccessExclusionResult {
  VpcBlockPublicAccessExclusion?: VpcBlockPublicAccessExclusion | undefined;
}
export interface DeleteVpcEndpointConnectionNotificationsRequest {
  DryRun?: boolean | undefined;
  ConnectionNotificationIds: string[] | undefined;
}
export interface DeleteVpcEndpointConnectionNotificationsResult {
  Unsuccessful?: UnsuccessfulItem[] | undefined;
}
export interface DeleteVpcEndpointsRequest {
  DryRun?: boolean | undefined;
  VpcEndpointIds: string[] | undefined;
}
export interface DeleteVpcEndpointsResult {
  Unsuccessful?: UnsuccessfulItem[] | undefined;
}
export interface DeleteVpcEndpointServiceConfigurationsRequest {
  DryRun?: boolean | undefined;
  ServiceIds: string[] | undefined;
}
export interface DeleteVpcEndpointServiceConfigurationsResult {
  Unsuccessful?: UnsuccessfulItem[] | undefined;
}
export interface DeleteVpcPeeringConnectionRequest {
  DryRun?: boolean | undefined;
  VpcPeeringConnectionId: string | undefined;
}
export interface DeleteVpcPeeringConnectionResult {
  Return?: boolean | undefined;
}
export interface DeleteVpnConnectionRequest {
  VpnConnectionId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeleteVpnConnectionRouteRequest {
  DestinationCidrBlock: string | undefined;
  VpnConnectionId: string | undefined;
}
export interface DeleteVpnGatewayRequest {
  VpnGatewayId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeprovisionByoipCidrRequest {
  Cidr: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeprovisionByoipCidrResult {
  ByoipCidr?: ByoipCidr | undefined;
}
export interface DeprovisionIpamByoasnRequest {
  DryRun?: boolean | undefined;
  IpamId: string | undefined;
  Asn: string | undefined;
}
export declare const AsnState: {
  readonly deprovisioned: "deprovisioned";
  readonly failed_deprovision: "failed-deprovision";
  readonly failed_provision: "failed-provision";
  readonly pending_deprovision: "pending-deprovision";
  readonly pending_provision: "pending-provision";
  readonly provisioned: "provisioned";
};
export type AsnState = (typeof AsnState)[keyof typeof AsnState];
export interface Byoasn {
  Asn?: string | undefined;
  IpamId?: string | undefined;
  StatusMessage?: string | undefined;
  State?: AsnState | undefined;
}
export interface DeprovisionIpamByoasnResult {
  Byoasn?: Byoasn | undefined;
}
export interface DeprovisionIpamPoolCidrRequest {
  DryRun?: boolean | undefined;
  IpamPoolId: string | undefined;
  Cidr?: string | undefined;
}
export declare const IpamPoolCidrFailureCode: {
  readonly cidr_not_available: "cidr-not-available";
  readonly limit_exceeded: "limit-exceeded";
};
export type IpamPoolCidrFailureCode =
  (typeof IpamPoolCidrFailureCode)[keyof typeof IpamPoolCidrFailureCode];
export interface IpamPoolCidrFailureReason {
  Code?: IpamPoolCidrFailureCode | undefined;
  Message?: string | undefined;
}
export declare const IpamPoolCidrState: {
  readonly deprovisioned: "deprovisioned";
  readonly failed_deprovision: "failed-deprovision";
  readonly failed_import: "failed-import";
  readonly failed_provision: "failed-provision";
  readonly pending_deprovision: "pending-deprovision";
  readonly pending_import: "pending-import";
  readonly pending_provision: "pending-provision";
  readonly provisioned: "provisioned";
};
export type IpamPoolCidrState =
  (typeof IpamPoolCidrState)[keyof typeof IpamPoolCidrState];
export interface IpamPoolCidr {
  Cidr?: string | undefined;
  State?: IpamPoolCidrState | undefined;
  FailureReason?: IpamPoolCidrFailureReason | undefined;
  IpamPoolCidrId?: string | undefined;
  NetmaskLength?: number | undefined;
}
export interface DeprovisionIpamPoolCidrResult {
  IpamPoolCidr?: IpamPoolCidr | undefined;
}
export interface DeprovisionPublicIpv4PoolCidrRequest {
  DryRun?: boolean | undefined;
  PoolId: string | undefined;
  Cidr: string | undefined;
}
export interface DeprovisionPublicIpv4PoolCidrResult {
  PoolId?: string | undefined;
  DeprovisionedAddresses?: string[] | undefined;
}
export interface DeregisterImageRequest {
  ImageId: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DeregisterInstanceTagAttributeRequest {
  IncludeAllTagsOfInstance?: boolean | undefined;
  InstanceTagKeys?: string[] | undefined;
}
export interface DeregisterInstanceEventNotificationAttributesRequest {
  DryRun?: boolean | undefined;
  InstanceTagAttribute: DeregisterInstanceTagAttributeRequest | undefined;
}
export interface InstanceTagNotificationAttribute {
  InstanceTagKeys?: string[] | undefined;
  IncludeAllTagsOfInstance?: boolean | undefined;
}
export interface DeregisterInstanceEventNotificationAttributesResult {
  InstanceTagAttribute?: InstanceTagNotificationAttribute | undefined;
}
export interface DeregisterTransitGatewayMulticastGroupMembersRequest {
  TransitGatewayMulticastDomainId?: string | undefined;
  GroupIpAddress?: string | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayMulticastDeregisteredGroupMembers {
  TransitGatewayMulticastDomainId?: string | undefined;
  DeregisteredNetworkInterfaceIds?: string[] | undefined;
  GroupIpAddress?: string | undefined;
}
export interface DeregisterTransitGatewayMulticastGroupMembersResult {
  DeregisteredMulticastGroupMembers?:
    | TransitGatewayMulticastDeregisteredGroupMembers
    | undefined;
}
export interface DeregisterTransitGatewayMulticastGroupSourcesRequest {
  TransitGatewayMulticastDomainId?: string | undefined;
  GroupIpAddress?: string | undefined;
  NetworkInterfaceIds?: string[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TransitGatewayMulticastDeregisteredGroupSources {
  TransitGatewayMulticastDomainId?: string | undefined;
  DeregisteredNetworkInterfaceIds?: string[] | undefined;
  GroupIpAddress?: string | undefined;
}
export interface DeregisterTransitGatewayMulticastGroupSourcesResult {
  DeregisteredMulticastGroupSources?:
    | TransitGatewayMulticastDeregisteredGroupSources
    | undefined;
}
export interface DescribeAccountAttributesRequest {
  DryRun?: boolean | undefined;
  AttributeNames?: AccountAttributeName[] | undefined;
}
export interface DescribeAccountAttributesResult {
  AccountAttributes?: AccountAttribute[] | undefined;
}
export interface Filter {
  Name?: string | undefined;
  Values?: string[] | undefined;
}
export interface DescribeAddressesRequest {
  PublicIps?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  AllocationIds?: string[] | undefined;
}
export interface DescribeAddressesResult {
  Addresses?: Address[] | undefined;
}
export interface DescribeAddressesAttributeRequest {
  AllocationIds?: string[] | undefined;
  Attribute?: AddressAttributeName | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeAddressesAttributeResult {
  Addresses?: AddressAttribute[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeAddressTransfersRequest {
  AllocationIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeAddressTransfersResult {
  AddressTransfers?: AddressTransfer[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeAggregateIdFormatRequest {
  DryRun?: boolean | undefined;
}
export interface IdFormat {
  Deadline?: Date | undefined;
  Resource?: string | undefined;
  UseLongIds?: boolean | undefined;
}
export interface DescribeAggregateIdFormatResult {
  UseLongIdsAggregated?: boolean | undefined;
  Statuses?: IdFormat[] | undefined;
}
export interface DescribeAvailabilityZonesRequest {
  ZoneNames?: string[] | undefined;
  ZoneIds?: string[] | undefined;
  AllAvailabilityZones?: boolean | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface AvailabilityZoneMessage {
  Message?: string | undefined;
}
export declare const AvailabilityZoneOptInStatus: {
  readonly not_opted_in: "not-opted-in";
  readonly opt_in_not_required: "opt-in-not-required";
  readonly opted_in: "opted-in";
};
export type AvailabilityZoneOptInStatus =
  (typeof AvailabilityZoneOptInStatus)[keyof typeof AvailabilityZoneOptInStatus];
export declare const AvailabilityZoneState: {
  readonly available: "available";
  readonly constrained: "constrained";
  readonly impaired: "impaired";
  readonly information: "information";
  readonly unavailable: "unavailable";
};
export type AvailabilityZoneState =
  (typeof AvailabilityZoneState)[keyof typeof AvailabilityZoneState];
export interface AvailabilityZone {
  OptInStatus?: AvailabilityZoneOptInStatus | undefined;
  Messages?: AvailabilityZoneMessage[] | undefined;
  RegionName?: string | undefined;
  ZoneName?: string | undefined;
  ZoneId?: string | undefined;
  GroupName?: string | undefined;
  NetworkBorderGroup?: string | undefined;
  ZoneType?: string | undefined;
  ParentZoneName?: string | undefined;
  ParentZoneId?: string | undefined;
  State?: AvailabilityZoneState | undefined;
}
export interface DescribeAvailabilityZonesResult {
  AvailabilityZones?: AvailabilityZone[] | undefined;
}
export interface DescribeAwsNetworkPerformanceMetricSubscriptionsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const MetricType: {
  readonly aggregate_latency: "aggregate-latency";
};
export type MetricType = (typeof MetricType)[keyof typeof MetricType];
export declare const PeriodType: {
  readonly fifteen_minutes: "fifteen-minutes";
  readonly five_minutes: "five-minutes";
  readonly one_day: "one-day";
  readonly one_hour: "one-hour";
  readonly one_week: "one-week";
  readonly three_hours: "three-hours";
};
export type PeriodType = (typeof PeriodType)[keyof typeof PeriodType];
export declare const StatisticType: {
  readonly p50: "p50";
};
export type StatisticType = (typeof StatisticType)[keyof typeof StatisticType];
export interface Subscription {
  Source?: string | undefined;
  Destination?: string | undefined;
  Metric?: MetricType | undefined;
  Statistic?: StatisticType | undefined;
  Period?: PeriodType | undefined;
}
export interface DescribeAwsNetworkPerformanceMetricSubscriptionsResult {
  NextToken?: string | undefined;
  Subscriptions?: Subscription[] | undefined;
}
export interface DescribeBundleTasksRequest {
  BundleIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeBundleTasksResult {
  BundleTasks?: BundleTask[] | undefined;
}
export interface DescribeByoipCidrsRequest {
  DryRun?: boolean | undefined;
  MaxResults: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeByoipCidrsResult {
  ByoipCidrs?: ByoipCidr[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeCapacityBlockExtensionHistoryRequest {
  CapacityReservationIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const CapacityBlockExtensionStatus: {
  readonly PAYMENT_FAILED: "payment-failed";
  readonly PAYMENT_PENDING: "payment-pending";
  readonly PAYMENT_SUCCEEDED: "payment-succeeded";
};
export type CapacityBlockExtensionStatus =
  (typeof CapacityBlockExtensionStatus)[keyof typeof CapacityBlockExtensionStatus];
export interface CapacityBlockExtension {
  CapacityReservationId?: string | undefined;
  InstanceType?: string | undefined;
  InstanceCount?: number | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  CapacityBlockExtensionOfferingId?: string | undefined;
  CapacityBlockExtensionDurationHours?: number | undefined;
  CapacityBlockExtensionStatus?: CapacityBlockExtensionStatus | undefined;
  CapacityBlockExtensionPurchaseDate?: Date | undefined;
  CapacityBlockExtensionStartDate?: Date | undefined;
  CapacityBlockExtensionEndDate?: Date | undefined;
  UpfrontFee?: string | undefined;
  CurrencyCode?: string | undefined;
}
export interface DescribeCapacityBlockExtensionHistoryResult {
  CapacityBlockExtensions?: CapacityBlockExtension[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeCapacityBlockExtensionOfferingsRequest {
  DryRun?: boolean | undefined;
  CapacityBlockExtensionDurationHours: number | undefined;
  CapacityReservationId: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface CapacityBlockExtensionOffering {
  CapacityBlockExtensionOfferingId?: string | undefined;
  InstanceType?: string | undefined;
  InstanceCount?: number | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  StartDate?: Date | undefined;
  CapacityBlockExtensionStartDate?: Date | undefined;
  CapacityBlockExtensionEndDate?: Date | undefined;
  CapacityBlockExtensionDurationHours?: number | undefined;
  UpfrontFee?: string | undefined;
  CurrencyCode?: string | undefined;
  Tenancy?: CapacityReservationTenancy | undefined;
}
export interface DescribeCapacityBlockExtensionOfferingsResult {
  CapacityBlockExtensionOfferings?:
    | CapacityBlockExtensionOffering[]
    | undefined;
  NextToken?: string | undefined;
}
export interface DescribeCapacityBlockOfferingsRequest {
  DryRun?: boolean | undefined;
  InstanceType?: string | undefined;
  InstanceCount?: number | undefined;
  StartDateRange?: Date | undefined;
  EndDateRange?: Date | undefined;
  CapacityDurationHours: number | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface CapacityBlockOffering {
  CapacityBlockOfferingId?: string | undefined;
  InstanceType?: string | undefined;
  AvailabilityZone?: string | undefined;
  InstanceCount?: number | undefined;
  StartDate?: Date | undefined;
  EndDate?: Date | undefined;
  CapacityBlockDurationHours?: number | undefined;
  UpfrontFee?: string | undefined;
  CurrencyCode?: string | undefined;
  Tenancy?: CapacityReservationTenancy | undefined;
  CapacityBlockDurationMinutes?: number | undefined;
}
export interface DescribeCapacityBlockOfferingsResult {
  CapacityBlockOfferings?: CapacityBlockOffering[] | undefined;
  NextToken?: string | undefined;
}
export declare const CallerRole: {
  readonly odcr_owner: "odcr-owner";
  readonly unused_reservation_billing_owner: "unused-reservation-billing-owner";
};
export type CallerRole = (typeof CallerRole)[keyof typeof CallerRole];
export interface DescribeCapacityReservationBillingRequestsRequest {
  CapacityReservationIds?: string[] | undefined;
  Role: CallerRole | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CapacityReservationInfo {
  InstanceType?: string | undefined;
  AvailabilityZone?: string | undefined;
  Tenancy?: CapacityReservationTenancy | undefined;
}
export declare const CapacityReservationBillingRequestStatus: {
  readonly accepted: "accepted";
  readonly cancelled: "cancelled";
  readonly expired: "expired";
  readonly pending: "pending";
  readonly rejected: "rejected";
  readonly revoked: "revoked";
};
export type CapacityReservationBillingRequestStatus =
  (typeof CapacityReservationBillingRequestStatus)[keyof typeof CapacityReservationBillingRequestStatus];
export interface CapacityReservationBillingRequest {
  CapacityReservationId?: string | undefined;
  RequestedBy?: string | undefined;
  UnusedReservationBillingOwnerId?: string | undefined;
  LastUpdateTime?: Date | undefined;
  Status?: CapacityReservationBillingRequestStatus | undefined;
  StatusMessage?: string | undefined;
  CapacityReservationInfo?: CapacityReservationInfo | undefined;
}
export interface DescribeCapacityReservationBillingRequestsResult {
  NextToken?: string | undefined;
  CapacityReservationBillingRequests?:
    | CapacityReservationBillingRequest[]
    | undefined;
}
export interface DescribeCapacityReservationFleetsRequest {
  CapacityReservationFleetIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface CapacityReservationFleet {
  CapacityReservationFleetId?: string | undefined;
  CapacityReservationFleetArn?: string | undefined;
  State?: CapacityReservationFleetState | undefined;
  TotalTargetCapacity?: number | undefined;
  TotalFulfilledCapacity?: number | undefined;
  Tenancy?: FleetCapacityReservationTenancy | undefined;
  EndDate?: Date | undefined;
  CreateTime?: Date | undefined;
  InstanceMatchCriteria?: FleetInstanceMatchCriteria | undefined;
  AllocationStrategy?: string | undefined;
  InstanceTypeSpecifications?: FleetCapacityReservation[] | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeCapacityReservationFleetsResult {
  CapacityReservationFleets?: CapacityReservationFleet[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeCapacityReservationsRequest {
  CapacityReservationIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeCapacityReservationsResult {
  NextToken?: string | undefined;
  CapacityReservations?: CapacityReservation[] | undefined;
}
export interface DescribeCarrierGatewaysRequest {
  CarrierGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeCarrierGatewaysResult {
  CarrierGateways?: CarrierGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeClassicLinkInstancesRequest {
  DryRun?: boolean | undefined;
  InstanceIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ClassicLinkInstance {
  Groups?: GroupIdentifier[] | undefined;
  InstanceId?: string | undefined;
  Tags?: Tag[] | undefined;
  VpcId?: string | undefined;
}
export interface DescribeClassicLinkInstancesResult {
  Instances?: ClassicLinkInstance[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeClientVpnAuthorizationRulesRequest {
  ClientVpnEndpointId: string | undefined;
  DryRun?: boolean | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
}
export interface AuthorizationRule {
  ClientVpnEndpointId?: string | undefined;
  Description?: string | undefined;
  GroupId?: string | undefined;
  AccessAll?: boolean | undefined;
  DestinationCidr?: string | undefined;
  Status?: ClientVpnAuthorizationRuleStatus | undefined;
}
export interface DescribeClientVpnAuthorizationRulesResult {
  AuthorizationRules?: AuthorizationRule[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeClientVpnConnectionsRequest {
  ClientVpnEndpointId: string | undefined;
  Filters?: Filter[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
}
export declare const ClientVpnConnectionStatusCode: {
  readonly active: "active";
  readonly failed_to_terminate: "failed-to-terminate";
  readonly terminated: "terminated";
  readonly terminating: "terminating";
};
export type ClientVpnConnectionStatusCode =
  (typeof ClientVpnConnectionStatusCode)[keyof typeof ClientVpnConnectionStatusCode];
export interface ClientVpnConnectionStatus {
  Code?: ClientVpnConnectionStatusCode | undefined;
  Message?: string | undefined;
}
export interface ClientVpnConnection {
  ClientVpnEndpointId?: string | undefined;
  Timestamp?: string | undefined;
  ConnectionId?: string | undefined;
  Username?: string | undefined;
  ConnectionEstablishedTime?: string | undefined;
  IngressBytes?: string | undefined;
  EgressBytes?: string | undefined;
  IngressPackets?: string | undefined;
  EgressPackets?: string | undefined;
  ClientIp?: string | undefined;
  CommonName?: string | undefined;
  Status?: ClientVpnConnectionStatus | undefined;
  ConnectionEndTime?: string | undefined;
  PostureComplianceStatuses?: string[] | undefined;
}
export interface DescribeClientVpnConnectionsResult {
  Connections?: ClientVpnConnection[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeClientVpnEndpointsRequest {
  ClientVpnEndpointIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export declare const AssociatedNetworkType: {
  readonly vpc: "vpc";
};
export type AssociatedNetworkType =
  (typeof AssociatedNetworkType)[keyof typeof AssociatedNetworkType];
export interface AssociatedTargetNetwork {
  NetworkId?: string | undefined;
  NetworkType?: AssociatedNetworkType | undefined;
}
export interface DirectoryServiceAuthentication {
  DirectoryId?: string | undefined;
}
export interface FederatedAuthentication {
  SamlProviderArn?: string | undefined;
  SelfServiceSamlProviderArn?: string | undefined;
}
export interface CertificateAuthentication {
  ClientRootCertificateChain?: string | undefined;
}
export interface ClientVpnAuthentication {
  Type?: ClientVpnAuthenticationType | undefined;
  ActiveDirectory?: DirectoryServiceAuthentication | undefined;
  MutualAuthentication?: CertificateAuthentication | undefined;
  FederatedAuthentication?: FederatedAuthentication | undefined;
}
export declare const ClientVpnEndpointAttributeStatusCode: {
  readonly applied: "applied";
  readonly applying: "applying";
};
export type ClientVpnEndpointAttributeStatusCode =
  (typeof ClientVpnEndpointAttributeStatusCode)[keyof typeof ClientVpnEndpointAttributeStatusCode];
export interface ClientVpnEndpointAttributeStatus {
  Code?: ClientVpnEndpointAttributeStatusCode | undefined;
  Message?: string | undefined;
}
export interface ClientConnectResponseOptions {
  Enabled?: boolean | undefined;
  LambdaFunctionArn?: string | undefined;
  Status?: ClientVpnEndpointAttributeStatus | undefined;
}
export interface ClientLoginBannerResponseOptions {
  Enabled?: boolean | undefined;
  BannerText?: string | undefined;
}
export interface ConnectionLogResponseOptions {
  Enabled?: boolean | undefined;
  CloudwatchLogGroup?: string | undefined;
  CloudwatchLogStream?: string | undefined;
}
export declare const VpnProtocol: {
  readonly openvpn: "openvpn";
};
export type VpnProtocol = (typeof VpnProtocol)[keyof typeof VpnProtocol];
export interface ClientVpnEndpoint {
  ClientVpnEndpointId?: string | undefined;
  Description?: string | undefined;
  Status?: ClientVpnEndpointStatus | undefined;
  CreationTime?: string | undefined;
  DeletionTime?: string | undefined;
  DnsName?: string | undefined;
  ClientCidrBlock?: string | undefined;
  DnsServers?: string[] | undefined;
  SplitTunnel?: boolean | undefined;
  VpnProtocol?: VpnProtocol | undefined;
  TransportProtocol?: TransportProtocol | undefined;
  VpnPort?: number | undefined;
  AssociatedTargetNetworks?: AssociatedTargetNetwork[] | undefined;
  ServerCertificateArn?: string | undefined;
  AuthenticationOptions?: ClientVpnAuthentication[] | undefined;
  ConnectionLogOptions?: ConnectionLogResponseOptions | undefined;
  Tags?: Tag[] | undefined;
  SecurityGroupIds?: string[] | undefined;
  VpcId?: string | undefined;
  SelfServicePortalUrl?: string | undefined;
  ClientConnectOptions?: ClientConnectResponseOptions | undefined;
  SessionTimeoutHours?: number | undefined;
  ClientLoginBannerOptions?: ClientLoginBannerResponseOptions | undefined;
}
export interface DescribeClientVpnEndpointsResult {
  ClientVpnEndpoints?: ClientVpnEndpoint[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeClientVpnRoutesRequest {
  ClientVpnEndpointId: string | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface ClientVpnRoute {
  ClientVpnEndpointId?: string | undefined;
  DestinationCidr?: string | undefined;
  TargetSubnet?: string | undefined;
  Type?: string | undefined;
  Origin?: string | undefined;
  Status?: ClientVpnRouteStatus | undefined;
  Description?: string | undefined;
}
export interface DescribeClientVpnRoutesResult {
  Routes?: ClientVpnRoute[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeClientVpnTargetNetworksRequest {
  ClientVpnEndpointId: string | undefined;
  AssociationIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface TargetNetwork {
  AssociationId?: string | undefined;
  VpcId?: string | undefined;
  TargetNetworkId?: string | undefined;
  ClientVpnEndpointId?: string | undefined;
  Status?: AssociationStatus | undefined;
  SecurityGroups?: string[] | undefined;
}
export interface DescribeClientVpnTargetNetworksResult {
  ClientVpnTargetNetworks?: TargetNetwork[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeCoipPoolsRequest {
  PoolIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeCoipPoolsResult {
  CoipPools?: CoipPool[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeConversionTasksRequest {
  DryRun?: boolean | undefined;
  ConversionTaskIds?: string[] | undefined;
}
export interface DiskImageDescription {
  Checksum?: string | undefined;
  Format?: DiskImageFormat | undefined;
  ImportManifestUrl?: string | undefined;
  Size?: number | undefined;
}
export interface DiskImageVolumeDescription {
  Id?: string | undefined;
  Size?: number | undefined;
}
export interface ImportInstanceVolumeDetailItem {
  AvailabilityZone?: string | undefined;
  BytesConverted?: number | undefined;
  Description?: string | undefined;
  Image?: DiskImageDescription | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  Volume?: DiskImageVolumeDescription | undefined;
}
export interface ImportInstanceTaskDetails {
  Description?: string | undefined;
  InstanceId?: string | undefined;
  Platform?: PlatformValues | undefined;
  Volumes?: ImportInstanceVolumeDetailItem[] | undefined;
}
export interface ImportVolumeTaskDetails {
  AvailabilityZone?: string | undefined;
  BytesConverted?: number | undefined;
  Description?: string | undefined;
  Image?: DiskImageDescription | undefined;
  Volume?: DiskImageVolumeDescription | undefined;
}
export declare const ConversionTaskState: {
  readonly active: "active";
  readonly cancelled: "cancelled";
  readonly cancelling: "cancelling";
  readonly completed: "completed";
};
export type ConversionTaskState =
  (typeof ConversionTaskState)[keyof typeof ConversionTaskState];
export interface ConversionTask {
  ConversionTaskId?: string | undefined;
  ExpirationTime?: string | undefined;
  ImportInstance?: ImportInstanceTaskDetails | undefined;
  ImportVolume?: ImportVolumeTaskDetails | undefined;
  State?: ConversionTaskState | undefined;
  StatusMessage?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeConversionTasksResult {
  ConversionTasks?: ConversionTask[] | undefined;
}
export interface DescribeCustomerGatewaysRequest {
  CustomerGatewayIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  DryRun?: boolean | undefined;
}
export interface DescribeCustomerGatewaysResult {
  CustomerGateways?: CustomerGateway[] | undefined;
}
export interface DescribeDhcpOptionsRequest {
  DhcpOptionsIds?: string[] | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeDhcpOptionsResult {
  NextToken?: string | undefined;
  DhcpOptions?: DhcpOptions[] | undefined;
}
export interface DescribeEgressOnlyInternetGatewaysRequest {
  DryRun?: boolean | undefined;
  EgressOnlyInternetGatewayIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeEgressOnlyInternetGatewaysResult {
  EgressOnlyInternetGateways?: EgressOnlyInternetGateway[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeElasticGpusRequest {
  ElasticGpuIds?: string[] | undefined;
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export declare const ElasticGpuStatus: {
  readonly Impaired: "IMPAIRED";
  readonly Ok: "OK";
};
export type ElasticGpuStatus =
  (typeof ElasticGpuStatus)[keyof typeof ElasticGpuStatus];
export interface ElasticGpuHealth {
  Status?: ElasticGpuStatus | undefined;
}
export declare const ElasticGpuState: {
  readonly Attached: "ATTACHED";
};
export type ElasticGpuState =
  (typeof ElasticGpuState)[keyof typeof ElasticGpuState];
export interface ElasticGpus {
  ElasticGpuId?: string | undefined;
  AvailabilityZone?: string | undefined;
  ElasticGpuType?: string | undefined;
  ElasticGpuHealth?: ElasticGpuHealth | undefined;
  ElasticGpuState?: ElasticGpuState | undefined;
  InstanceId?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeElasticGpusResult {
  ElasticGpuSet?: ElasticGpus[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DescribeExportImageTasksRequest {
  DryRun?: boolean | undefined;
  Filters?: Filter[] | undefined;
  ExportImageTaskIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ExportTaskS3Location {
  S3Bucket?: string | undefined;
  S3Prefix?: string | undefined;
}
export interface ExportImageTask {
  Description?: string | undefined;
  ExportImageTaskId?: string | undefined;
  ImageId?: string | undefined;
  Progress?: string | undefined;
  S3ExportLocation?: ExportTaskS3Location | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeExportImageTasksResult {
  ExportImageTasks?: ExportImageTask[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeExportTasksRequest {
  Filters?: Filter[] | undefined;
  ExportTaskIds?: string[] | undefined;
}
export interface DescribeExportTasksResult {
  ExportTasks?: ExportTask[] | undefined;
}
export interface DescribeFastLaunchImagesRequest {
  ImageIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export interface FastLaunchLaunchTemplateSpecificationResponse {
  LaunchTemplateId?: string | undefined;
  LaunchTemplateName?: string | undefined;
  Version?: string | undefined;
}
export declare const FastLaunchResourceType: {
  readonly SNAPSHOT: "snapshot";
};
export type FastLaunchResourceType =
  (typeof FastLaunchResourceType)[keyof typeof FastLaunchResourceType];
export interface FastLaunchSnapshotConfigurationResponse {
  TargetResourceCount?: number | undefined;
}
export declare const FastLaunchStateCode: {
  readonly disabling: "disabling";
  readonly disabling_failed: "disabling-failed";
  readonly enabled: "enabled";
  readonly enabled_failed: "enabled-failed";
  readonly enabling: "enabling";
  readonly enabling_failed: "enabling-failed";
};
export type FastLaunchStateCode =
  (typeof FastLaunchStateCode)[keyof typeof FastLaunchStateCode];
export interface DescribeFastLaunchImagesSuccessItem {
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
export interface DescribeFastLaunchImagesResult {
  FastLaunchImages?: DescribeFastLaunchImagesSuccessItem[] | undefined;
  NextToken?: string | undefined;
}
export interface DescribeFastSnapshotRestoresRequest {
  Filters?: Filter[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  DryRun?: boolean | undefined;
}
export declare const FastSnapshotRestoreStateCode: {
  readonly disabled: "disabled";
  readonly disabling: "disabling";
  readonly enabled: "enabled";
  readonly enabling: "enabling";
  readonly optimizing: "optimizing";
};
export type FastSnapshotRestoreStateCode =
  (typeof FastSnapshotRestoreStateCode)[keyof typeof FastSnapshotRestoreStateCode];
export interface DescribeFastSnapshotRestoreSuccessItem {
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
export interface DescribeFastSnapshotRestoresResult {
  FastSnapshotRestores?: DescribeFastSnapshotRestoreSuccessItem[] | undefined;
  NextToken?: string | undefined;
}
export declare const FleetEventType: {
  readonly FLEET_CHANGE: "fleet-change";
  readonly INSTANCE_CHANGE: "instance-change";
  readonly SERVICE_ERROR: "service-error";
};
export type FleetEventType =
  (typeof FleetEventType)[keyof typeof FleetEventType];
export interface DescribeFleetHistoryRequest {
  DryRun?: boolean | undefined;
  EventType?: FleetEventType | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  FleetId: string | undefined;
  StartTime: Date | undefined;
}
export interface EventInformation {
  EventDescription?: string | undefined;
  EventSubType?: string | undefined;
  InstanceId?: string | undefined;
}
export interface HistoryRecordEntry {
  EventInformation?: EventInformation | undefined;
  EventType?: FleetEventType | undefined;
  Timestamp?: Date | undefined;
}
export interface DescribeFleetHistoryResult {
  HistoryRecords?: HistoryRecordEntry[] | undefined;
  LastEvaluatedTime?: Date | undefined;
  NextToken?: string | undefined;
  FleetId?: string | undefined;
  StartTime?: Date | undefined;
}
export interface DescribeFleetInstancesRequest {
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  FleetId: string | undefined;
  Filters?: Filter[] | undefined;
}
export interface DescribeFleetInstancesResult {
  ActiveInstances?: ActiveInstance[] | undefined;
  NextToken?: string | undefined;
  FleetId?: string | undefined;
}
export interface DescribeFleetsRequest {
  DryRun?: boolean | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
  FleetIds?: string[] | undefined;
  Filters?: Filter[] | undefined;
}
export declare const FleetActivityStatus: {
  readonly ERROR: "error";
  readonly FULFILLED: "fulfilled";
  readonly PENDING_FULFILLMENT: "pending_fulfillment";
  readonly PENDING_TERMINATION: "pending_termination";
};
export type FleetActivityStatus =
  (typeof FleetActivityStatus)[keyof typeof FleetActivityStatus];
export interface DescribeFleetError {
  LaunchTemplateAndOverrides?: LaunchTemplateAndOverridesResponse | undefined;
  Lifecycle?: InstanceLifecycle | undefined;
  ErrorCode?: string | undefined;
  ErrorMessage?: string | undefined;
}
export interface DescribeFleetsInstances {
  LaunchTemplateAndOverrides?: LaunchTemplateAndOverridesResponse | undefined;
  Lifecycle?: InstanceLifecycle | undefined;
  InstanceIds?: string[] | undefined;
  InstanceType?: _InstanceType | undefined;
  Platform?: PlatformValues | undefined;
}
export interface FleetLaunchTemplateConfig {
  LaunchTemplateSpecification?: FleetLaunchTemplateSpecification | undefined;
  Overrides?: FleetLaunchTemplateOverrides[] | undefined;
}
export interface CapacityReservationOptions {
  UsageStrategy?: FleetCapacityReservationUsageStrategy | undefined;
}
export interface OnDemandOptions {
  AllocationStrategy?: FleetOnDemandAllocationStrategy | undefined;
  CapacityReservationOptions?: CapacityReservationOptions | undefined;
  SingleInstanceType?: boolean | undefined;
  SingleAvailabilityZone?: boolean | undefined;
  MinTargetCapacity?: number | undefined;
  MaxTotalPrice?: string | undefined;
}
export interface FleetSpotCapacityRebalance {
  ReplacementStrategy?: FleetReplacementStrategy | undefined;
  TerminationDelay?: number | undefined;
}
export interface FleetSpotMaintenanceStrategies {
  CapacityRebalance?: FleetSpotCapacityRebalance | undefined;
}
export interface SpotOptions {
  AllocationStrategy?: SpotAllocationStrategy | undefined;
  MaintenanceStrategies?: FleetSpotMaintenanceStrategies | undefined;
  InstanceInterruptionBehavior?: SpotInstanceInterruptionBehavior | undefined;
  InstancePoolsToUseCount?: number | undefined;
  SingleInstanceType?: boolean | undefined;
  SingleAvailabilityZone?: boolean | undefined;
  MinTargetCapacity?: number | undefined;
  MaxTotalPrice?: string | undefined;
}
export interface TargetCapacitySpecification {
  TotalTargetCapacity?: number | undefined;
  OnDemandTargetCapacity?: number | undefined;
  SpotTargetCapacity?: number | undefined;
  DefaultTargetCapacityType?: DefaultTargetCapacityType | undefined;
  TargetCapacityUnitType?: TargetCapacityUnitType | undefined;
}
export interface FleetData {
  ActivityStatus?: FleetActivityStatus | undefined;
  CreateTime?: Date | undefined;
  FleetId?: string | undefined;
  FleetState?: FleetStateCode | undefined;
  ClientToken?: string | undefined;
  ExcessCapacityTerminationPolicy?:
    | FleetExcessCapacityTerminationPolicy
    | undefined;
  FulfilledCapacity?: number | undefined;
  FulfilledOnDemandCapacity?: number | undefined;
  LaunchTemplateConfigs?: FleetLaunchTemplateConfig[] | undefined;
  TargetCapacitySpecification?: TargetCapacitySpecification | undefined;
  TerminateInstancesWithExpiration?: boolean | undefined;
  Type?: FleetType | undefined;
  ValidFrom?: Date | undefined;
  ValidUntil?: Date | undefined;
  ReplaceUnhealthyInstances?: boolean | undefined;
  SpotOptions?: SpotOptions | undefined;
  OnDemandOptions?: OnDemandOptions | undefined;
  Tags?: Tag[] | undefined;
  Errors?: DescribeFleetError[] | undefined;
  Instances?: DescribeFleetsInstances[] | undefined;
  Context?: string | undefined;
}
export interface DescribeFleetsResult {
  NextToken?: string | undefined;
  Fleets?: FleetData[] | undefined;
}
export interface DescribeFlowLogsRequest {
  DryRun?: boolean | undefined;
  Filter?: Filter[] | undefined;
  FlowLogIds?: string[] | undefined;
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface DestinationOptionsResponse {
  FileFormat?: DestinationFileFormat | undefined;
  HiveCompatiblePartitions?: boolean | undefined;
  PerHourPartition?: boolean | undefined;
}
export interface FlowLog {
  CreationTime?: Date | undefined;
  DeliverLogsErrorMessage?: string | undefined;
  DeliverLogsPermissionArn?: string | undefined;
  DeliverCrossAccountRole?: string | undefined;
  DeliverLogsStatus?: string | undefined;
  FlowLogId?: string | undefined;
  FlowLogStatus?: string | undefined;
  LogGroupName?: string | undefined;
  ResourceId?: string | undefined;
  TrafficType?: TrafficType | undefined;
  LogDestinationType?: LogDestinationType | undefined;
  LogDestination?: string | undefined;
  LogFormat?: string | undefined;
  Tags?: Tag[] | undefined;
  MaxAggregationInterval?: number | undefined;
  DestinationOptions?: DestinationOptionsResponse | undefined;
}
export interface DescribeFlowLogsResult {
  FlowLogs?: FlowLog[] | undefined;
  NextToken?: string | undefined;
}
export declare const FpgaImageAttributeName: {
  readonly description: "description";
  readonly loadPermission: "loadPermission";
  readonly name: "name";
  readonly productCodes: "productCodes";
};
export type FpgaImageAttributeName =
  (typeof FpgaImageAttributeName)[keyof typeof FpgaImageAttributeName];
export interface DescribeFpgaImageAttributeRequest {
  DryRun?: boolean | undefined;
  FpgaImageId: string | undefined;
  Attribute: FpgaImageAttributeName | undefined;
}
export declare const PermissionGroup: {
  readonly all: "all";
};
export type PermissionGroup =
  (typeof PermissionGroup)[keyof typeof PermissionGroup];
export interface LoadPermission {
  UserId?: string | undefined;
  Group?: PermissionGroup | undefined;
}
export declare const ProductCodeValues: {
  readonly devpay: "devpay";
  readonly marketplace: "marketplace";
};
export type ProductCodeValues =
  (typeof ProductCodeValues)[keyof typeof ProductCodeValues];
export declare const DeleteVerifiedAccessTrustProviderResultFilterSensitiveLog: (
  obj: DeleteVerifiedAccessTrustProviderResult
) => any;
export declare const DescribeBundleTasksResultFilterSensitiveLog: (
  obj: DescribeBundleTasksResult
) => any;
export declare const DiskImageDescriptionFilterSensitiveLog: (
  obj: DiskImageDescription
) => any;
export declare const ImportInstanceVolumeDetailItemFilterSensitiveLog: (
  obj: ImportInstanceVolumeDetailItem
) => any;
export declare const ImportInstanceTaskDetailsFilterSensitiveLog: (
  obj: ImportInstanceTaskDetails
) => any;
export declare const ImportVolumeTaskDetailsFilterSensitiveLog: (
  obj: ImportVolumeTaskDetails
) => any;
export declare const ConversionTaskFilterSensitiveLog: (
  obj: ConversionTask
) => any;
export declare const DescribeConversionTasksResultFilterSensitiveLog: (
  obj: DescribeConversionTasksResult
) => any;
