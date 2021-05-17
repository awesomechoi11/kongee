import "./styles.scss";

import Mouse from "./pages/mouse";
import Main from "./pages/main";
import LoadingOverlay from "./pages/loadingOverlay";
function App() {
    return (
        <>
            <Mouse />
            <LoadingOverlay />
            <Main />
        </>
    );
}

export default App;
