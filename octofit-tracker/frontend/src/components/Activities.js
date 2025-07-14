import React, { useEffect, useState } from 'react';


function Activities() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetch('https://neu-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Fehler beim Laden der Aktivitäten:', error));
  }, []);

  const handleShowModal = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  return (
    <div>
      <h1 className="mb-4">Aktivitäten</h1>
      <div className="card">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Typ</th>
              <th>Dauer</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.activity_type}</td>
                <td>{activity.duration}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleShowModal(activity)}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      {showModal && selectedActivity && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Aktivität Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Typ:</strong> {selectedActivity.activity_type}</p>
                <p><strong>Dauer:</strong> {selectedActivity.duration}</p>
                {/* Weitere Felder hier */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Schließen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
