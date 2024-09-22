import { useSelector } from "react-redux";
import "./Leaderboard.css";

const Leaderboard = () => {
    const users = Object.values(useSelector((state) => state.users));
    return (
        <div>
            <table className="table-container">
                <thead className="table-header">
                    <tr className="table-row">
                        <th className="table-header-item">User</th>
                        <th className="table-header-item">Answered</th>
                        <th className="table-header-item">Created</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td className="table-body-item">
                                    <span className="user-name">{user.name}</span>
                                    <br />{user.id}</td>
                                <td className="table-body-item">{Object.keys(user.answers).length}</td>
                                <td className="table-body-item">{user.questions.length}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    );
};


export default Leaderboard;