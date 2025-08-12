import { BestSellingItemsTable, CustomerDemographics, CustomerStatistics, RecentSalesTable, SalesStatisticsSummary, SalesTrendsChart, TopSellingCategories } from "@UI/components/Sales/SalesStatisticsSummary";

export default function SalesSection() {
    // Dummy data, replace with your actual data source
    const salesData = {
      sales: "$214,212",
      salesChange: "+12%",
      purchases: "$82,451.22",
      purchasesChange: "-5%",
      returns: "$62,412.11",
      returnsChange: "+8%",
      addition: "$52,471.21",
      additionChange: "-3%",
    };
  
    const customerStats = {
      returningPct: 75,
      newPct: 60,
      retargetPct: 40,
      overallPct: 100,
    };
  
    const topCategories = [
      { name: "Beverages", pct: 25 },
      { name: "Health", pct: 20 },
      { name: "Beauty", pct: 18 },
      { name: "Electronics", pct: 15 },
      { name: "Clothing", pct: 12 },
    ];
  
    const ageDistribution = [
      { label: "18-24", pct: 20 },
      { label: "25-34", pct: 35 },
      { label: "35-44", pct: 25 },
      { label: "45+", pct: 20 },
    ];
  
    const genderDistribution = [
      { label: "Male", pct: 45 },
      { label: "Female", pct: 45 },
      { label: "Other", pct: 10 },
    ];
  
    const bestSellingItems = [
      { item: "Organic Green Tea", totalRevenue: "$15,000", percentSales: 7.5 },
      { item: "Vitamin C Supplements", totalRevenue: "$12,000", percentSales: 6 },
      { item: "Anti-Aging Serum", totalRevenue: "$10,000", percentSales: 5 },
      { item: "Wireless Headphones", totalRevenue: "$8,000", percentSales: 4 },
      { item: "Summer Dresses", totalRevenue: "$7,000", percentSales: 3.5 },
    ];
  
    const recentSales = [
      { item: "1", productName: "Organic Green Tea", price: "15" },
      { item: "2", productName: "Vitamin C Supplements", price: "12" },
      { item: "3", productName: "Anti-Aging Serum", price: "10" },
      { item: "4", productName: "Wireless Headphones", price: "8" },
      { item: "5", productName: "Summer Dresses", price: "7" },
    ];
  
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        <SalesStatisticsSummary {...salesData} />
        <SalesTrendsChart earnings="$1,250" changePercent="+12%" />
        <CustomerStatistics {...customerStats} />
        <TopSellingCategories categories={topCategories} overallPct={100} />
        <CustomerDemographics
          ageDistribution={ageDistribution}
          genderDistribution={genderDistribution}
        />
        <BestSellingItemsTable items={bestSellingItems} />
        <RecentSalesTable sales={recentSales} />
      </div>
    );
  }
  