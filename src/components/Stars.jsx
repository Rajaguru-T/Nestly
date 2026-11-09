
function Stars({ rating }) {
  const full = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= full ? "★" : "☆";
  }
  return (
    <span className="stars" title={rating + " out of 5"}>
      {stars} <span className="rating-num">{Number(rating).toFixed(1)}</span>
    </span>
  );
}

export default Stars;
