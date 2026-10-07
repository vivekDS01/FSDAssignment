import "./ProfileCard.css";

function ProfileCard(props) {
  return (
    <div className="card">
      <img className="avatar" src={props.image} alt={props.name} />
      <h2 className="name">{props.name}</h2>
      <p className="description">{props.description}</p>
    </div>
  );
}

export default ProfileCard;