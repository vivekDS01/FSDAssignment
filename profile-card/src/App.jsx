import ProfileCard from "./components/ProfileCard";
import "./App.css";

function App() {
  return (
    <div className="cards-row">
      <ProfileCard
        name="Aarav Sharma"
        image="https://i.pravatar.cc/200?img=12"
        description="Frontend developer who loves building clean, simple interfaces."
      />
      <ProfileCard
        name="Priya Patil"
        image="https://i.pravatar.cc/200?img=47"
        description="UI designer and coffee enthusiast based in Pune."
      />
      <ProfileCard
        name="Rohan Mehta"
        image="https://i.pravatar.cc/200?img=33"
        description="Backend developer focused on APIs and databases."
      />
    </div>
  );
}

export default App;