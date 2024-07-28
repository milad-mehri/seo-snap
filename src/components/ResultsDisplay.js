const ResultsDisplay = ({ results }) => {
    const getStatus = (score) => {
      if (score >= 80) return 'Success';
      if (score >= 50) return 'Warning';
      return 'Fail';
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case 'Success':
          return 'text-green-500';
        case 'Warning':
          return 'text-yellow-500';
        default:
          return 'text-red-500';
      }
    };
  
    return (
      <div className="mt-4">
        {Object.entries(results).map(([key, [score, message]], index) => {
          const status = getStatus(score);
          const statusColor = getStatusColor(status);
  
          return (
            <div key={index} className="flex justify-between p-2 my-2 bg-sidebar-bg rounded">
              <span className="text-text-secondary font-semibold w-1/4">{key}</span>
              <span className={`font-semibold w-1/4 ${statusColor}`}>{status}</span>
              <span className={`font-semibold ${statusColor} w-1/4`}>{score}</span>
              <span className="font-semibold text-gray-500 w-1/4">{message || 'No message'}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default ResultsDisplay;
  