const Privacy = () => {
  return (
    <>
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our
                photography services. Please read this privacy policy carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="mb-4">We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal data (name, email address, phone number) provided when booking services</li>
                <li>Payment information processed through secure payment gateways</li>
                <li>Photographs and images taken during photography sessions</li>
                <li>Usage data and analytics from website visits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process your bookings and deliver photography services</li>
                <li>Send booking confirmations and service updates</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send promotional materials (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Image Rights and Usage</h2>
              <p>
                All photographs taken during sessions remain the property of our studio unless otherwise specified in your contract. We may use
                selected images for portfolio display, marketing materials, and social media with your permission. You retain the right to request
                removal of your images from our marketing materials at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
              <p>
                We may share your information with trusted third-party service providers who assist us in operating our website, conducting our
                business, or servicing you. These parties are obligated to keep your information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data we hold</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for image usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies</h2>
              <p>
                Our website uses cookies to enhance user experience and analyze site traffic. You can choose to disable cookies through your browser
                settings, though this may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p>
                We reserve the right to update this privacy policy at any time. We will notify you of any changes by posting the new policy on this
                page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at privacy@studiophoto.com or through our contact page.</p>
            </section>

            <p className="text-sm mt-12 pt-8 border-t border-border">
              Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Privacy
