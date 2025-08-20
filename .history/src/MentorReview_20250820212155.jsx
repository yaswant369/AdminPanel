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
  return <div></div>;
}

export default MentorReview;
