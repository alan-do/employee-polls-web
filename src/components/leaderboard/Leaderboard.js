import { useSelector } from "react-redux";
import "./Leaderboard.css";

const Leaderboard = () => {
    const users = Object.values(useSelector((state) => state.users));
    const sortedUsers = users.sort((a, b) => 
        (Object.keys(b.answers).length + b.questions.length) - 
        (Object.keys(a.answers).length + a.questions.length)
    );

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
                        sortedUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="table-body-item">
                                    <div className="user-info">
                                        <img src={user.avatarURL} alt={user.name} className="user-avatar" />
                                        <div className="user-name">
                                            <span className="user-name">{user.name}</span>
                                            <br />{user.id}
                                        </div>
                                    </div>
                                </td>
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