import React from 'react'

function About() {
    return (
        <div className="py-16 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/simple-blue-gradient-background-vector-business_53876-174922.jpg')" }}>
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:5/12 lg:w-5/12">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/009/665/215/original/recruitment-banner-element-design-with-a-microphone-hiring-concept-design-for-business-we-are-hiring-and-job-vacancies-element-image-open-vacancy-design-free-png.png"
                        alt="image"
                    />

                </div>
                <div className="md:7/12 lg:w-6/12">
                    <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                    Where Opportunities Meet Talent
                    </h2>
                    <p className="mt-6 text-gray-600">
                    Our job portal connects job seekers with employers to help find the perfect match. We offer a wide range of job listings across various industries, from entry-level to executive positions. With an easy-to-use platform, users can search for job opportunities, view detailed job descriptions, and apply directly to positions. Employers can post job openings and find qualified candidates quickly. Our mission is to simplify the hiring process and provide valuable opportunities for both job seekers and employers.
                    </p>
                    <p className="mt-4 text-gray-600">
                    Join us today and take the next step in your career journey or find the ideal candidate for your company.
                    </p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default About
