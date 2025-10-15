import { useState } from 'react';
import { useWorkflow } from '../../../hooks/useWorkflow';

import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import {
  FaFileDownload,
  FaMinus,
  FaPauseCircle,
  FaPlayCircle,
  FaPlus,
  FaRegStopCircle,
} from 'react-icons/fa';
import { RxResume } from 'react-icons/rx';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { LANGUAGE, tCommon, toEn, toKo, tWarning } from '../../../utils/i18nUtils';
export const WorkflowFAB = () => {
  const {
    runSimulation,
    pauseExecution,
    executionState,
    resumeExecution,
    stopExecution,
    exportWorkflowJSON,
  } = useWorkflow();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const selectedNode = useAtomValue(selectedNodeAtom);

  const isRunning = executionState === 'running';
  const isPaused = executionState === 'paused';

  const isKorea = i18n.language === LANGUAGE.KO;
  const isEnglish = i18n.language === LANGUAGE.EN;

  // 실행 중이면 정지, 일시정지 중이면 정지, 아니면 시뮬레이션 시작
  const handleMainExecution = () => {
    if (isRunning || isPaused) {
      stopExecution();
    } else {
      // toast.warning

      if (selectedNode) {
        runSimulation(selectedNode.id);
      } else {
        alert(tWarning('node.selectStart'));
      }
    }
  };

  // 실행 중이면 일시정지, 일시정지 중이면 재개
  const handlePauseResume = () => {
    if (isRunning) pauseExecution();
    else if (isPaused) resumeExecution();
  };
  // 실행 중이면 일시 중지면 정지, 그 외 시작
  const renderExecutionIcon = () => {
    if (isRunning || isPaused) return <FaRegStopCircle />;
    return <FaPlayCircle />;
  };
  // 실행 중이면 일시정지 , 일시정지 면 재게, 그 외 일시 정지
  const renderPauseResumeIcon = () => {
    if (isRunning) return <FaPauseCircle />;
    if (isPaused) return <RxResume />;
    return <FaPauseCircle />;
  };
  // [영어 -> 한국어], [한국어 -> 영어] 로 변경
  const handleChangeLanguage = () => {
    if (isKorea) toEn();
    else if (isEnglish) toKo();
  };
  const renderI18nIcon = () => {
    if (isKorea) {
      return <i>{LANGUAGE.KO}</i>;
    } else if (isEnglish) {
      return <i>{LANGUAGE.EN}</i>;
    } else {
      return <i>{LANGUAGE.KO}</i>;
    }
  };
  const getExecutionTitle = () => {
    if (isRunning || isPaused) return tCommon('stopSimulation');
    return tCommon('runSimulation');
  };

  const getPauseResumeTitle = () => {
    if (isRunning) return tCommon('pauseSimulation');
    if (isPaused) return tCommon('resumeSimulation');
    return tCommon('pauseSimulation');
  };

  return (
    <div className="fab-container">
      <div className="fab-main fab-sub" onClick={() => setOpen(!open)}>
        {open ? <FaMinus /> : <FaPlus />}
      </div>

      {/* 서브 버튼들 */}
      <div className={`fab-menu ${open ? 'open' : ''}`}>
        <div className="fab-sub" onClick={handleMainExecution} title={getExecutionTitle()}>
          {renderExecutionIcon()}
        </div>
        <div className="fab-sub" onClick={handlePauseResume} title={getPauseResumeTitle()}>
          {renderPauseResumeIcon()}
        </div>
        <div className="fab-sub" onClick={exportWorkflowJSON} title={tCommon('exportWorkflow')}>
          <FaFileDownload />
        </div>
        {/* TEXT 출력이라 TITLE 없어도 될듯 */}
        <div className="fab-sub" onClick={handleChangeLanguage}>
          {renderI18nIcon()}
        </div>
      </div>
    </div>
  );
};
