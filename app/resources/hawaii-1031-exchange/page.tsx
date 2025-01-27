import { Building2, Clock, ArrowLeftRight, DollarSign } from 'lucide-react';

export default function Hawaii1031ExchangePage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Hawaii 1031 Exchange Guide</h1>
            <p className="text-muted-foreground text-lg">
              Understanding tax-deferred property exchanges in Hawaii
            </p>
          </div>

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Building2 className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-semibold m-0">What is a 1031 Exchange?</h2>
                </div>
                <p className="text-muted-foreground">
                  A 1031 exchange, named after Section 1031 of the Internal Revenue Code, allows investors 
                  to defer capital gains taxes by exchanging one investment property for another of like-kind.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-semibold m-0">Critical Timelines</h2>
                </div>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    45 days to identify replacement property
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    180 days to complete the exchange
                  </li>
                </ul>
              </div>
            </div>

            <h2>Key Requirements</h2>
            <ul>
              <li>Properties must be held for investment or business use</li>
              <li>Must be "like-kind" properties (real estate for real estate)</li>
              <li>Equal or greater value to defer all taxes</li>
              <li>Cannot receive "boot" (cash or other non-like-kind property)</li>
              <li>Must use a qualified intermediary</li>
            </ul>

            <h2>Benefits of a 1031 Exchange</h2>
            <div className="grid gap-6 md:grid-cols-2 my-8">
              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <DollarSign className="w-5 h-5 text-primary mr-2" />
                  Tax Benefits
                </h3>
                <ul className="list-none p-0 space-y-2">
                  <li>Defer capital gains taxes</li>
                  <li>Preserve equity for reinvestment</li>
                  <li>Potential for increased depreciation</li>
                  <li>Estate planning advantages</li>
                </ul>
              </div>

              <div className="bg-secondary p-6 rounded-lg">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <ArrowLeftRight className="w-5 h-5 text-primary mr-2" />
                  Investment Benefits
                </h3>
                <ul className="list-none p-0 space-y-2">
                  <li>Portfolio diversification</li>
                  <li>Property consolidation/division</li>
                  <li>Geographic relocation</li>
                  <li>Management relief</li>
                </ul>
              </div>
            </div>

            <h2>Hawaii-Specific Considerations</h2>
            <p>
              When conducting a 1031 exchange in Hawaii, there are several unique factors to consider:
            </p>
            <ul>
              <li>High property values and limited inventory</li>
              <li>Special land use and zoning regulations</li>
              <li>Leasehold vs. fee simple properties</li>
              <li>Vacation rental considerations</li>
              <li>State tax implications</li>
            </ul>

            <div className="bg-card p-6 rounded-lg border border-border mt-8">
              <h3 className="text-xl font-semibold mb-4">Common Mistakes to Avoid</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2" />
                  Missing identification or exchange deadlines
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2" />
                  Improper property identification
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2" />
                  Not using a qualified intermediary
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2" />
                  Taking constructive receipt of funds
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-6 rounded-lg mt-8">
              <p className="text-sm text-muted-foreground m-0">
                Disclaimer: This information is for educational purposes only and should not be considered 
                tax or legal advice. Please consult with qualified tax and legal professionals before 
                engaging in a 1031 exchange.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
