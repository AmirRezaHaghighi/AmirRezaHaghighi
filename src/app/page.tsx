
// pages
import EmployeeListView from "./employee/page";
//--------------------

/**
 * The Home component renders the EmployeeListView component wrapped within the DataProvider.
 * @returns {JSX.Element} The JSX representation of the Home component.
 */

export default function Home() {
  return <EmployeeListView />;
}
