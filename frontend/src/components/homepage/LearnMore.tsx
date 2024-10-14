const LearnMore = () => {
  return (
    <section id="learn-more" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">How can you contribute?</h3>
            <p className="mb-4">
              There are many ways to get involved in our environmental efforts. We
              invite you to join us in our mission to be stewards of a cleaner,
              healthier Ghana. Whether you're passionate about preserving our
              forests, protecting our water bodies, or combating illegal mining,
              there's a place for you in our community.
            </p>
            <button className="text-blue-400 hover:underline">Read More</button>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">How did this project come about?</h3>
            <p className="mb-4">
              BaseWatch Ghana was born out of a deep concern for the environmental
              challenges facing our nation. A group of passionate environmentalists,
              tech enthusiasts, and community leaders came together with a shared
              vision: to create a platform that empowers every Ghanaian to become a
              guardian of our natural resources.
            </p>
            <button className="text-blue-400 hover:underline">Discover More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
