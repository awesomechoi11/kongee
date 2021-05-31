import "./styles.scss";

import Mouse from "./pages/mouse";
import Main from "./pages/main";
import Overlay from "./pages/loadingOverlay";
function App() {
    return (
        <>
            <Mouse />
            <Main />
            <Overlay />
        </>
    );
}

export default App;
