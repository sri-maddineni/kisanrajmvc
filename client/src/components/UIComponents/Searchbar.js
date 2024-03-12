import "./Searchbar.css";
function Searchbar() {
  return (
    <>
      <form action="">
        <input
          type="search"
          placeholder="Search for Tomatoes in Ongole"
          className="loc"
        />
        <button className="btnsearch">
          <i className="fa fa-search "></i>
        </button>
      </form>
    </>
  );
}

export default Searchbar;