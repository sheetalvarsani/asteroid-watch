import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import DisplayArea from "../../components/DisplayArea/DisplayArea";


function Layout() {
    return (
        <div>
            <TopBar />
            <div>
                <SideBar />
                <DisplayArea />
            </div>
        </div>
    );
}

export default Layout;
