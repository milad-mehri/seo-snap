const ResultsDisplay = ({ results }) => {
    const getStatus = (score) => {
      if (score >= 80) return 'Success';
      if (score >= 50) return 'Warning';
      return 'Fail';
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case 'Success':
          return 'text-success';
        case 'Warning':
          return 'text-warning';
        default:
          return 'text-error';
      }
    };
  
    return (
      <div className="mt-4">
        {Object.entries(results).map(([key, [score, message]], index) => {
          const status = getStatus(score);
          const statusColor = getStatusColor(status);
  
          return (
            <div key={index} className="flex justify-between p-2 my-2 bg-sidebar-item-bg rounded">
              <span className="text-text-secondary font-semibold w-1/4">{key}</span>
              <span className={`font-semibold w-1/4 ${statusColor}`}>{status}</span>
              <span className="font-semibold text-success w-1/4 hidden sm:inline">{score}</span>
              <span className="font-semibold text-gray-500 w-1/4 hidden md:inline">{message || 'No message'}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default ResultsDisplay;
  