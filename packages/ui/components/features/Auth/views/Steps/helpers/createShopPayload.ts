import { BusinessType, CollaborationType, CreateShopInput, MemberInput, ShopStatus, StoreFor, StoreType, TargetGenders } from "@features/API";


// Helper to extract country code from phone
const extractCountryCode = (phone: string): string => {
    // e.g., "+142421421412" => "1"
    const match = phone.match(/^\+(\d+)/);
    return match ? match[1] : "";
  };
  
  // Reusable function to create payload
  export const createShopPayload = (values: any): { args: CreateShopInput } => {
    const payload: CreateShopInput = {
      businessType:
        values.businessType === "shop" ? BusinessType.Shop : BusinessType.Services,
  
      collaborationType:
        values.collaborationType === "company"
          ? CollaborationType.Company
          : CollaborationType.Individual,
  
      phone: values.phone,
  
      targetGenders: values.targetGenders.map((g: string) => g as TargetGenders),
      storeFor: values.storeFor.map((s: string) => s as StoreFor),
  
      storeType: values.storeType === "product" ? StoreType.Product : StoreType.Service,
  
      members:
        values.collaborationType === "company"
          ? (values.members.map((m: any) => ({
              memberType: m.memberType || [],
              firstName: m.firstName || "",
              lastName: m.lastName || "",
              email: m.email || "",
              birthDate: m.birthDate || "",
              idNumber: m.idNumber || "",
              idExpiration: m.idExpiration || "",
              phone: m.phone || "",
              address: m.address || "",
              city: m.city || "",
              country: m.country || "",
              state: m.state || "",
              postalCode: m.postalCode || "",
            })) as unknown) as MemberInput[]
          : [],
  
      banner: "https://yourcdn.com/default-banner.png",
      description: [{ langId: "en", value: "" }],
      name: [{ langId: "en", value: "" }],
      email: values.email || "no-reply@example.com",
      hashtags: values.hashtags || [],
      images: values.images || [],
      videos: values.videos || [],
      thumbnail: values.thumbnail || "",
  
      location: {
        address: values.address,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
        country: values.country,
        countryCode: extractCountryCode(values.phone),
      },
  
      companyName: [{ langId: "en", value: values.companyName || "Default Shop" }],
      payment_methods: values.payment_methods || [],
      status: ShopStatus.Active,
    };
  
    return {
      args: {
        ...payload,
       
      },
    };
  };