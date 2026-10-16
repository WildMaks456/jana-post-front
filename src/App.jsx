import { downloadJson, toOutput } from './address/records';
import Workspace from './components/Review/Workspace';
import UploadScreen from './components/Upload/UploadScreen';
import { useReviewSession } from './hooks/useReviewSession';

export default function App() {
  const session = useReviewSession();

  if (session.status !== 'ready') {
    return (
      <UploadScreen
        status={session.status}
        progress={session.progress}
        error={session.error}
        onRun={session.run}
        onCancel={session.cancel}
      />
    );
  }

  const handleExport = () => {
    const base = session.fileName.replace(/\.json$/i, '').replace(/[^\p{L}\p{N}_-]+/gu, '_') || 'addresses';
    downloadJson(`${base}_parsed.json`, session.records.map(toOutput));
  };

  return (
    <Workspace
      records={session.records}
      fileName={session.fileName}
      onSave={session.saveRecord}
      onExport={handleExport}
      onReset={() => {
        if (window.confirm('Загрузить другой файл? Текущий разбор и правки будут сброшены.')) session.reset();
      }}
    />
  );
}
