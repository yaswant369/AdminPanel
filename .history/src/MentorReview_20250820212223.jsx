import React, { useState, useEffect } from "react";

function MentorReview() {
  const [mentorReviews, setMentorReviews] = useState([
    {
      id: 1,
      mentor: "Dr. Reddy",
      feedback: "Excellent guidance for AI projects.",
      rating: 5,
    },
    {
      id: 2,
      mentor: "Ms. Sharma",
      feedback: "Resume Builder students had strong engagement.",
      rating: 4.8,
    },
    {
      id: 3,
      mentor: "Dr. Singh",
      feedback: "Provided insightful feedback on data projects.",
      rating: 4.5,
    },
  ]);

  const [newReviewMentor, setNewReviewMentor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState("");

  const addMentorReview = () => {
    if (newReviewMentor && newReviewText && newReviewRating) {
      const newId =
        mentorReviews.length > 0
          ? Math.max(...mentorReviews.map((r) => r.id)) + 1
          : 1;
      const review = {
        id: newId,
        mentor: newReviewMentor,
        feedback: newReviewText,
        rating: parseFloat(newReviewRating),
      };
      setMentorReviews([...mentorReviews, review]);
      setNewReviewMentor("");
      setNewReviewText("");
      setNewReviewRating("");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      );
    }
    return stars;
  };
  return (
    <div>
      <section id="mentor" className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
          Mentor Reviews{" "}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="Searching">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mentor Name{" "}
            </label>
            <input
              type="text"
              placeholder="Mentor Name"
              value={newReviewMentor}
              onChange={(e) => setNewReviewMentor(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="Searching">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Text{" "}
            </label>
            <input
              type="text"
              placeholder="Review Text"
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="Searching">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Rating{" "}
            </label>
            <input
              type="number"
              placeholder="Rating (0-5)"
              value={newReviewRating}
              onChange={(e) => setNewReviewRating(e.target.value)}
              min="0"
              max="5"
              step="0.1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={addMentorReview}
          className="mb-6 bg-[#0781d9] hover:bg-[#025e9f] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Add Review
        </button>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[25px]">
          {mentorReviews.map((review) => (
            <div
              key={review.id}
              className="p-[25px] bg-[#fdfdfd] shadow-[var(--shadow)] transition-transform duration-200 ease-in-out hover:-translate-y-[3px]"
            >
              <h4 className="mb-[10px] text-[1.25rem] text-[rgba(0,208,181,1)] font-semibold">
                {review.mentor}
              </h4>
              <p className="italic text-[var(--text-dark)] mb-[10px] leading-[1.6]">
                "{review.feedback}"
              </p>
              <div className="text-[1.3rem] text-[rgb(254,109,53)]">
                {renderStars(review.rating)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MentorReview;
