import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { SectionMapPropName } from '../../constants';
import { SectionIndexMap } from '../../types';
import { useSelector } from 'react-redux';
import styles from './emptyPage.module.scss';
import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { ISectionManagerActions } from '../../pageManager/types';
import { SectionManager } from '../../pageManager/sectionManager';
import { IComponentData } from '@weblancer-ui/types';

export const EmptyPage = () => {
  const { propManager } = useWeblancerCommonManager();
  const sectionManager =
    useWeblancerEditorManager<ISectionManagerActions>(SectionManager);

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
    const newSectionMap = sectionManager.addSection(0, {});

    propManager.updateComponentProp(
      pageData.id,
      SectionMapPropName,
      newSectionMap,
      true
    );
  };

  return (
    <div className={styles.root}>
      <button onClick={createNewSection} className={styles.button}>
        Add a new section
      </button>
    </div>
  );
};
