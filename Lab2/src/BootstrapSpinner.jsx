function BootstrapSpinner() {
    return <div className="d-flex justify-content-center py-5">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            {/* <p>WIIIIHOOO - jag åker karuselllll</p> */}
        </div>
        <p>Loading data, please wait...</p>
    </div>
}

export default BootstrapSpinner;