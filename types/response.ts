
export interface GetDetailedPropertyResponse {
    home: Home;
}

export interface Home {
    __typename:               string;
    property_id:              string;
    last_update_date:         Date;
    last_price_change_date:   null;
    last_price_change_amount: null;
    listing_id:               string;
    status:                   string;
    href:                     string;
    days_on_market:           null;
    list_date:                Date;
    create_date:              Date;
    mortgage:                 Mortgage;
    hoa:                      Hoa;
    buyers:                   null;
    description:              HomeDescription;
    pet_policy:               null;
    assigned_schools:         AssignedSchools;
    nearby_schools:           Schools;
    schools:                  Schools;
    products:                 Products;
    list_price:               number;
    list_price_min:           null;
    list_price_max:           null;
    price_per_sqft:           number;
    community:                null;
    lead_attributes:          LeadAttributes;
    flags:                    Flags;
    provider_url:             null;
    source:                   HomeSource;
    details:                  Detail[];
    open_houses:              OpenHouse[];
    tax_history:              TaxHistory[];
    location:                 Location;
    branding:                 Branding[];
    consumer_advertisers:     ConsumerAdvertiser[];
    advertisers:              Advertiser[];
    photo_count:              number;
    photos:                   PhotoElement[];
    property_history:         PropertyHistory[];
    local:                    Local;
    last_sold_price:          number;
    last_sold_date:           Date;
    estimates:                Estimates;
    virtual_tours:            null;
    videos:                   null;
    matterport:               null;
    terms:                    null;
    monthly_fees:             null;
    one_time_fees:            null;
    units:                    null;
}

export interface Advertiser {
    __typename:     string;
    fulfillment_id: string;
    name:           string;
    type:           string;
    team_name:      null;
    email:          string;
    href:           string;
    state_license:  string;
    phones:         OfficePhone[];
    office:         Office;
    broker:         Broker;
    photo:          OfficePhoto;
}

export interface Broker {
    __typename:     string;
    fulfillment_id: string;
    name:           string;
}

export interface Office {
    __typename:     string;
    fulfillment_id: string;
    name:           string;
    href:           string;
    photo:          OfficePhoto;
    email:          string;
    phones:         OfficePhone[];
}

export interface OfficePhone {
    __typename: string;
    number:     string;
    type:       string;
    ext:        string;
}

export interface OfficePhoto {
    __typename: string;
    href:       null | string;
}

export interface AssignedSchools {
    __typename: string;
    schools:    AssignedSchoolsSchool[];
}

export interface AssignedSchoolsSchool {
    __typename: SchoolTypename;
    district:   PurpleDistrict;
}

export enum SchoolTypename {
    School = "School",
}

export interface PurpleDistrict {
    __typename:    DistrictTypename;
    name:          Name;
    id:            string;
    phone:         null;
    student_count: null;
    grades:        null;
}

export enum DistrictTypename {
    SchoolDistrict = "SchoolDistrict",
}

export enum Name {
    LosAngelesUnifiedSchoolDistrict = "Los Angeles Unified School District",
}

export interface Branding {
    __typename:   string;
    type:         string;
    photo:        null | string;
    name:         string;
    phone:        null;
    slogan:       null;
    accent_color: null;
    link:         null;
}

export interface ConsumerAdvertiser {
    __typename:        string;
    advertiser_id:     string;
    office_id:         string;
    agent_id:          string;
    name:              string;
    phone:             null | string;
    type:              string;
    href:              string;
    slogan:            null;
    photo:             OfficePhoto;
    show_realtor_logo: boolean;
    hours:             null;
}

export interface HomeDescription {
    __typename:         string;
    baths_consolidated: string;
    baths:              number;
    baths_min:          null;
    baths_max:          null;
    heating:            null;
    cooling:            null;
    beds:               number;
    beds_min:           null;
    beds_max:           null;
    garage:             number;
    garage_min:         null;
    garage_max:         null;
    pool:               null;
    sqft:               number;
    sqft_min:           null;
    sqft_max:           null;
    styles:             null;
    lot_sqft:           number;
    units:              null;
    stories:            number;
    type:               string;
    sub_type:           string;
    text:               string;
    year_built:         number;
    name:               null;
}

export interface Detail {
    __typename: DetailTypename;
    category:   string;
    text:       string[];
}

export enum DetailTypename {
    HomeDetails = "HomeDetails",
}

export interface Estimates {
    __typename:        string;
    current_values:    CurrentValue[];
    historical_values: Value[];
    forecast_values:   Value[];
}

export interface CurrentValue {
    __typename:    string;
    source:        CurrentValueSource;
    estimate:      number;
    estimate_high: number;
    estimate_low:  number;
    date:          Date;
}

export interface CurrentValueSource {
    __typename: string;
    type:       string;
    name:       string;
}

export interface Value {
    __typename: string;
    source:     CurrentValueSource;
    estimates:  EstimateElement[];
}

export interface EstimateElement {
    __typename: EstimateTypename;
    estimate:   number;
    date:       Date;
}

export enum EstimateTypename {
    EstimateRecord = "EstimateRecord",
}

export interface Flags {
    __typename:             string;
    is_contingent:          null;
    is_garage_present:      boolean;
    is_new_construction:    null;
    is_pending:             null;
    is_short_sale:          null;
    is_foreclosure:         null;
    is_senior_community:    null;
    is_for_rent:            null;
    is_deal_available:      null;
    is_price_excludes_land: null;
    is_promotion_present:   null;
    is_subdivision:         null;
    is_plan:                null;
    is_price_reduced:       null;
    is_new_listing:         boolean;
    is_coming_soon:         null;
}

export interface Hoa {
    __typename:   string;
    fee:          number;
    historic_fee: boolean;
}

export interface LeadAttributes {
    __typename:              string;
    opcity_lead_attributes:  OpcityLeadAttributes;
    ready_connect_mortgage:  ReadyConnectMortgage;
    show_contact_an_agent:   boolean;
    lead_type:               string;
    show_lead_form:          boolean;
    disclaimer_text:         null;
    is_tcpa_message_enabled: null;
    show_text_leads:         boolean;
}

export interface OpcityLeadAttributes {
    __typename:              string;
    flip_the_market_enabled: boolean;
    cashback_enabled:        boolean;
    phones:                  OpcityLeadAttributesPhone[];
    local_phone:             string;
}

export interface OpcityLeadAttributesPhone {
    __typename: string;
    number:     string;
    category:   string;
}

export interface ReadyConnectMortgage {
    __typename:            string;
    show_contact_a_lender: boolean;
    show_veterans_united:  boolean;
}

export interface Local {
    __typename: string;
    noise:      Noise;
    flood:      Flood;
}

export interface Flood {
    __typename:         string;
    flood_factor_score: number;
    fema_zone:          string[];
}

export interface Noise {
    __typename:       string;
    score:            number;
    noise_categories: NoiseCategory[];
}

export interface NoiseCategory {
    __typename: string;
    type:       string;
    text:       string;
}

export interface Location {
    __typename:      string;
    address:         Address;
    county:          County;
    street_view_url: string;
    neighborhoods:   Neighborhood[];
}

export interface Address {
    __typename:    string;
    line:          string;
    street_number: string;
    street_name:   string;
    street_suffix: string;
    unit:          string;
    city:          string;
    state_code:    string;
    postal_code:   string;
    state:         string;
    coordinate:    Coordinate;
}

export interface Coordinate {
    __typename: CoordinateTypename;
    lat:        number;
    lon:        number;
}

export enum CoordinateTypename {
    Coordinate = "Coordinate",
    HomeCoordinate = "HomeCoordinate",
}

export interface County {
    __typename: string;
    fips_code:  string;
}

export interface Neighborhood {
    __typename:     string;
    name:           string;
    city:           string;
    level:          string;
    geo_statistics: GeoStatistics;
}

export interface GeoStatistics {
    __typename:     string;
    housing_market: HousingMarket;
}

export interface HousingMarket {
    __typename:            string;
    median_price_per_sqft: number;
    median_sold_price:     number;
    median_listing_price:  number;
    median_days_on_market: number;
}

export interface Mortgage {
    __typename:        string;
    property_tax_rate: number;
    rates_url:         string;
    insurance_rate:    number;
    estimate:          MortgageEstimate;
    average_rates:     AverageRateElement[];
}

export interface AverageRateElement {
    __typename: string;
    loan_type:  PurpleLoanType;
    rate:       number;
}

export interface PurpleLoanType {
    __typename: string;
    loan_id:    string;
}

export interface MortgageEstimate {
    __typename:              string;
    loan_amount:             number;
    monthly_payment:         number;
    total_payment:           number;
    down_payment:            number;
    average_rate:            EstimateAverageRate;
    monthly_payment_details: MonthlyPaymentDetail[];
}

export interface EstimateAverageRate {
    __typename: string;
    rate:       number;
    loan_type:  FluffyLoanType;
}

export interface FluffyLoanType {
    __typename: string;
    term:       number;
}

export interface MonthlyPaymentDetail {
    __typename:   string;
    type:         string;
    amount:       number;
    display_name: string;
}

export interface Schools {
    __typename: string;
    schools:    NearbySchoolsSchool[];
}

export interface NearbySchoolsSchool {
    __typename:        SchoolTypename;
    assigned:          boolean | null;
    coordinate:        Coordinate;
    distance_in_miles: number;
    district:          FluffyDistrict;
    education_levels:  EducationLevel[];
    funding_type:      FundingType;
    grades:            string[];
    id:                string;
    name:              string;
    parent_rating:     number | null;
    rating:            number | null;
    student_count:     number;
}

export interface FluffyDistrict {
    __typename: DistrictTypename;
    id:         string;
    name:       Name | null;
}

export enum EducationLevel {
    Elementary = "elementary",
    High = "high",
    Middle = "middle",
}

export enum FundingType {
    Private = "private",
    Public = "public",
}

export interface OpenHouse {
    __typename:  string;
    start_date:  Date;
    end_date:    Date;
    description: null;
    time_zone:   string;
    dst:         boolean;
    href:        null;
    methods:     string[];
}

export interface PhotoElement {
    __typename: PhotoTypename;
    href:       string;
    type:       Type;
    tags:       Tag[];
}

export enum PhotoTypename {
    HomePhoto = "HomePhoto",
}

export interface Tag {
    __typename:  TagTypename;
    label:       string;
    probability: number;
}

export enum TagTypename {
    Tag = "Tag",
}

export enum Type {
    RealtordotcomMlsListingImage = "realtordotcom_mls_listing_image",
}

export interface Products {
    __typename: string;
    products:   string[];
}

export interface PropertyHistory {
    __typename:  string;
    date:        Date;
    event_name:  string;
    price:       number;
    source_name: string;
    listing:     Listing | null;
}

export interface Listing {
    __typename:  string;
    photos:      PhotoElement[];
    description: ListingDescription;
}

export interface ListingDescription {
    __typename: string;
    sqft:       number;
}

export interface HomeSource {
    __typename:   string;
    id:           string;
    disclaimer:   Disclaimer;
    listing_id:   string;
    plan_id:      null;
    spec_id:      null;
    community_id: null;
    name:         string;
    type:         string;
    raw:          Raw;
}

export interface Disclaimer {
    __typename: string;
    text:       string;
    href:       null;
}

export interface Raw {
    __typename: string;
    style:      null;
    tax_amount: null;
}

export interface TaxHistory {
    __typename: TaxHistoryTypename;
    tax:        number;
    year:       number;
    assessment: Assessment;
}

export enum TaxHistoryTypename {
    TaxHistory = "TaxHistory",
}

export interface Assessment {
    __typename: AssessmentTypename;
    building:   number;
    land:       number;
    total:      number;
}

export enum AssessmentTypename {
    Assessment = "Assessment",
}
