import { useWeblancerEditorManager } from '@weblancer-ui/editor-core';
import { useWeblancerCommonManager } from '@weblancer-ui/tool-kit';
import { ISectionManagerActions } from '../../pageManager/types';
import { SectionManager } from '../../pageManager/sectionManager';
import { IComponentData } from '@weblancer-ui/types';
import { useSelector } from 'react-redux';
import { SectionIndexMap } from '../../types';
import { SectionMapPropName } from '../../constants';
import styles from './sectionAdd.module.scss';
import { useAdjustmentVersion } from '@weblancer-ui/adjustment-manager';

export const SectionAdd = () => {
  const { propManager } = useWeblancerCommonManager();
  const sectionManager =
    useWeblancerEditorManager<ISectionManagerActions>(SectionManager);

  const pageData: IComponentData = useSelector(
    propManager.getPageDataSelector()
  );

  useAdjustmentVersion();

  const sectionMap: SectionIndexMap = useSelector(
    propManager.getComponentPropChangeSelector(
      pageData?.id ?? '',
      SectionMapPropName
    )
  );

  if (!pageData?.id || !sectionMap) {
    return null;
  }

  const addSection = (index: number) => {
    const newSectionMap = sectionManager.addSection(index, sectionMap);

    propManager.updateComponentProp(
      pageData.id,
      SectionMapPropName,
      newSectionMap,
      true
    );
  };

  return Object.values(sectionMap).map(({ id, index }) => {
    return (
      <SectionPlus
        key={id}
        id={id}
        index={index}
        onClick={(_index) => addSection(_index)}
      />
    );
  });
};

interface ISectionPlusProps {
  index: number;
  id: string;
  onClick(index: number): void;
}

const SectionPlus = ({ id, index, onClick }: ISectionPlusProps) => {
  const { propManager, adjustmentManager } = useWeblancerCommonManager();

  useSelector(propManager.getComponentChangeSelector(id));

  const sectionRootRef = adjustmentManager.getItemRootRef(id);
  if (!sectionRootRef?.current) return null;

  const sectionRect = sectionRootRef.current.getBoundingClientRect();

  return (
    <>
      {index === 0 && (
        <div
          className={styles.plus}
          onClick={() => onClick(index)}
          style={{
            top: sectionRect.top,
          }}
        >
          +
        </div>
      )}
      <div
        className={styles.plus}
        onClick={() => onClick(index + 1)}
        style={{
          top: sectionRect.top + sectionRect.height,
        }}
      >
        +
      </div>
    </>
  );
};
