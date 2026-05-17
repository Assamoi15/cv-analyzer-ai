function FeedbackList({ feedback }) {


  return (

    <div className="feedback">

      <h3>💬 Feedback IA</h3>

      <div className="feedback-list">
        {(feedback || []).map((f, i) => (
          <div className="feedback-item" key={i}>
            <span className="feedback-icon">💡</span>
            <p>{f}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default FeedbackList;