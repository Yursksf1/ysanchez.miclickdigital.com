
function Table() {
  return (
    <table className="table table-bordered text-center">
        <tr>
            <th className="center">Turno</th>
            <th>Numero</th>
            <th>Picas</th>
            <th>Fijas</th>
        </tr>
        <tbody id="history">

        </tbody>
    </table>
  );
}

export default Table;