const termsData = [
  {
    id: 1,
    title: '1. Acceptance of Terms',
    description:
      'By accessing and using this website, you agree to comply with these Terms and Conditions. If you disagree with any part, you must not use our website. We may modify these terms at any time, and your continued use signifies acceptance of any changes.'
  },
  {
    id: 2,
    title: '2. Use of the Service',
    description:
      "You agree to use Gotrip for lawful purposes only. Prohibited activities include harassing or causing distress to others, distributing harmful content, or disrupting the website's operations. Unauthorized access to our systems is strictly forbidden. This is a project site, and no real transactions or interactions should be expected."
  },
  {
    id: 3,
    title: '3. Intellectual Property',
    description:
      'All content on Gotrip, including text, graphics, logos, and software, is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our explicit consent. Our trademarks and trade dress may not be used without our prior written permission.'
  },
  {
    id: 4,
    title: '4. User Content',
    description:
      'By submitting content to Gotrip, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content. You represent that you have the rights to grant us this license. We reserve the right to remove any content that violates our policies.'
  },
  {
    id: 5,
    title: '5. Disclaimer of Warranties',
    description:
      'This website is provided "as is" without warranties of any kind. Gotrip does not guarantee the accuracy or completeness of the content and disclaims liability for any errors or omissions. Use the site at your own risk. As this is a project, features and content may change without notice.'
  },
  {
    id: 6,
    title: '6. Limitations of Liability',
    description:
      'Gotrip will not be liable for any indirect, incidental, or consequential damages arising from your use of the website. Our total liability for any claims shall not exceed the amount you paid us, if any, for using the website. Remember, this is a demonstration project.'
  },
  {
    id: 7,
    title: '7. Governing Law',
    description:
      'These terms are governed by and construed in accordance with the laws of the jurisdiction in which Gotrip operates. Any disputes will be resolved exclusively in the courts of that jurisdiction.'
  },
  {
    id: 8,
    title: '8. Changes to Terms',
    description:
      'We reserve the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. It is your responsibility to review these terms regularly.'
  }
];

const TermsAndConditions = () => {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-neutral-800">Terms and Conditions</h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-neutral-700 mb-6">
            Welcome to Gotrip. These Terms and Conditions govern your use of our website. Please read them carefully
            before using our services. By accessing and using Gotrip, you accept and agree to these terms. Note: This is
            a demonstration project and not a commercial service.
          </p>

          {termsData.map((data) => (
            <div key={data.id}>
              <h2 className="text-2xl font-semibold mb-4 text-neutral-800">{data.title}</h2>
              <p className="text-neutral-700 mb-6">{data.description}</p>
            </div>
          ))}

          <p className="text-neutral-600 text-sm mt-8">
            These terms and conditions are subject to change at any time without prior notice. By using this website,
            you agree to be bound by the current version of these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
