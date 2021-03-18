// import context
import { useClientsContext } from '../index';

export default function ClientRow({ status, client }) {
  const { searchClients, setSelectedClient } = useClientsContext();
  const { code, birthYear, curClient } = client;

  function handleClickClient() {
    setSelectedClient(client);
  }

  // logic to toggle if this row is shown or not
  const statusObj = { 1: 'all', 2: true, 3: false };
  const toggledStatus = statusObj[status];

  const statusSelected = toggledStatus === 'all' || toggledStatus === curClient;

  const searchable =
    code.toLowerCase().includes(searchClients.toLowerCase()) ||
    birthYear.toString().includes(searchClients);

  const toggleDisp = !statusSelected || !searchable ? { display: 'none' } : {};

  return (
    <div className='clients-row' onClick={handleClickClient}>
      <p style={toggleDisp}>{code}</p>
      <p style={toggleDisp}>{birthYear}</p>
      <p style={toggleDisp}>{curClient ? 'Active' : 'Terminated'}</p>
    </div>
  );
}
