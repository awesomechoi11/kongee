import "./styles.scss";
import Mouse from "./pages/mouse";
import Main from "./pages/main";
import Overlay from "./pages/loadingOverlay";
import { Helmet } from "react-helmet";

function App() {
    return (
        <>
            <Helmet>
                {process.env.NODE_ENV === "production" ? (
                    <script
                        async
                        defer
                        data-website-id="4aaa6d88-2eeb-4adc-80bb-aa621d957738"
                        src="https://umami.brandon-choi.info/umami.js"
                    ></script>
                ) : (
                    <script
                        async
                        defer
                        data-website-id="985d71a1-971c-4b5b-8f3b-bf9faedc18a8"
                        src="https://umami.brandon-choi.info/umami.js"
                    ></script>
                )}
            </Helmet>
            <Mouse />
            <Main />
            <Overlay />
        </>
    );
}

export default App;
