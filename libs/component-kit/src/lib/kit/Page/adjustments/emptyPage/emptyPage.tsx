import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { SectionMapPropName } from '../../constants';
import { SectionIndexMap } from '../../types';
import { useSelector } from 'react-redux';
import styles from './emptyPage.module.scss';
import { IComponentData } from '@weblancer-ui/types';
import { EditorAction } from '@weblancer-ui/undo-manager';
import { AddSectionAction } from '../../sectionManager/actions/AddSectionAction';

export const EmptyPage = () => {
  const { propManager } = useWeblancerCommonManager();

  const pageData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  const sectionMap: SectionIndexMap = useSelector(
    propManager.getComponentPropChangeSelector(
      pageData?.id ?? '',
      SectionMapPropName
    )
  );

  if (!pageData?.id || (sectionMap && Object.keys(sectionMap).length > 0)) {
    return null;
  }

  const createNewSection = () => {
    EditorAction.getActionInstance(AddSectionAction).prepare(0, {}).perform();
  };

  return (
    <div className={styles.root}>
      <button onClick={createNewSection} className={styles.button}>
        Add a new section
      </button>
    </div>
  );
};
