import { FileText, Shield, Search, Scale } from 'lucide-react';

export default function HawaiiTitlePage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Hawaii Title Information</h1>
            <p className="text-muted-foreground text-lg">
              Understanding the title process and protecting your property rights in Hawaii
            </p>
          </div>

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="grid gap-12 md:grid-cols-2 mb-12">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-semibold m-0">Title Insurance</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Title insurance protects property owners and lenders against losses resulting from defects in the title.
                </p>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    Protection against ownership claims
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    Coverage for document errors
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    Defense against lawsuits
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center mb-4">
                  <Search className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-semibold m-0">Title Search Process</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  A thorough examination of public records to confirm the property's legal ownership and identify any claims.
                </p>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    Property ownership history
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    Outstanding mortgages
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    Tax assessments and liens
                  </li>
                </ul>
              </div>
            </div>

            <h2>Common Title Issues in Hawaii</h2>
            <p>
              Hawaii's unique property history and land laws can create special challenges in the title process. 
              Here are some common issues to be aware of:
            </p>
            <ul>
              <li>Kuleana land rights and claims</li>
              <li>Missing or incorrect property descriptions</li>
              <li>Unreleased mortgages or liens</li>
              <li>Boundary disputes</li>
              <li>Easement rights and restrictions</li>
            </ul>

            <h2>The Importance of Title Insurance</h2>
            <p>
              Title insurance is crucial in Hawaii real estate transactions for several reasons:
            </p>
            <ul>
              <li>Protection against unknown claims to the property</li>
              <li>Coverage for legal defense costs</li>
              <li>Peace of mind during property ownership</li>
              <li>Required by most lenders for mortgages</li>
            </ul>

            <div className="bg-secondary p-6 rounded-lg mt-8">
              <h3 className="flex items-center text-xl font-semibold mb-4">
                <Scale className="w-6 h-6 text-primary mr-3" />
                Legal Considerations
              </h3>
              <p className="mb-4">
                It's important to work with qualified title professionals and legal experts who understand 
                Hawaii's unique property laws and can help ensure a smooth transaction.
              </p>
              <p className="text-sm text-muted-foreground">
                Note: This information is for general educational purposes only and should not be 
                considered legal advice. Please consult with a qualified legal professional for 
                specific guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
