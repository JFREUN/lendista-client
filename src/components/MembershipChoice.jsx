
function MembershipChoice({ membership, setMembership, setCredits, credits }) {
  const handleMembershipChange = (value, creditsValue) => {
    setMembership(value);
    setCredits(creditsValue);
  };


  return (
    <div className="pageWrapper">
      <p>Choose your membership:</p>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="S"
            checked={membership === "S"}
            className="radioBtn"
            onChange={() => handleMembershipChange("S", 50)}
          />
          S Membership: 50€/month
        </label>

        <label>
          <input
            type="radio"
            value="M"
            checked={membership === "M"}
            className="radioBtn"
            onChange={() => handleMembershipChange("M", 100)}
          />
          M Membership 100€/month
        </label>
        <label>
          <input
            type="radio"
            value="L"
            checked={membership === "L"}
            className="radioBtn"
            onChange={() => handleMembershipChange("L", 250)}
          />
          L Membership 250€/month
        </label>
      </div>
    </div>
  );
}

export default MembershipChoice;
